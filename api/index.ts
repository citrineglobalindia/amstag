// Vercel Node.js serverless function wrapping the TanStack Start SSR worker.
// The worker was built for Cloudflare with `nodejs_compat` and exposes a
// Web-Workers-style `fetch(Request) => Response` handler. Vercel's Node
// runtime hands us Express-style (req, res), so we bridge between them.
import type { IncomingMessage, ServerResponse } from "node:http";
import worker from "../dist/server/index.js";

export const config = { runtime: "nodejs" };

function buildRequestUrl(req: IncomingMessage): string {
  const host = (req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost") as string;
  const proto = ((req.headers["x-forwarded-proto"] as string) ?? "https").split(",")[0].trim();
  return `${proto}://${host}${req.url ?? "/"}`;
}

function toRequest(req: IncomingMessage): Request {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, String(value));
    }
  }

  const method = (req.method ?? "GET").toUpperCase();
  const init: RequestInit = { method, headers };
  if (method !== "GET" && method !== "HEAD") {
    // Stream the request body. Node's req is an async iterable of Buffers.
    init.body = (req as unknown as ReadableStream<Uint8Array>) ?? undefined;
    // @ts-expect-error duplex required when body is a stream
    init.duplex = "half";
  }
  return new Request(buildRequestUrl(req), init);
}

async function writeResponse(res: ServerResponse, response: Response): Promise<void> {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!response.body) {
    res.end();
    return;
  }
  const reader = response.body.getReader();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }
  res.end();
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const request = toRequest(req);
    const response = await worker.fetch(request, {}, {});
    await writeResponse(res, response);
  } catch (err) {
    console.error("[vercel-handler]", err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
