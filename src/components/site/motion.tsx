// Reusable scroll-triggered motion primitives built on framer-motion.
// Keeps animations consistent across the site and respects prefers-reduced-motion.
//
// SSR safety
// ----------
// Earlier versions wrapped every Reveal/Stagger* directly with framer-motion's
// initial={opacity:0}. That ships an inline style="opacity:0;transform:..."
// in the SSR HTML. If JS hydration was slow or hit an error on the user's
// device, pages stayed invisible. The current implementation defers the
// animation wrapper until after the client has mounted AND only applies it
// to elements that are below the fold at mount time. Above-the-fold and
// already-visible content stays painted from the SSR HTML, so pages are
// never blank.
import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const offsetFor = (dir: RevealDirection, distance: number) => {
  switch (dir) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

// Decide once at mount whether this element should opt into the fade-in
// animation. Elements that are already on screen (or above it) at mount
// stay visible, no animation needed. Elements below the fold opt in.
function useEnableScrollReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enable, setEnable] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    // "Below the fold" — needs at least ~15% viewport headroom before the
    // top of the element. Anything closer is treated as already visible.
    const belowFold = r.top > window.innerHeight * 0.85;
    if (belowFold) setEnable(true);
  }, []);

  return { ref, enable };
}

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition" | "variants" | "ref"
> & {
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

/** Single fade/slide-in element triggered when it enters the viewport. */
export function Reveal({
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  children,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, enable } = useEnableScrollReveal();

  if (reduce || !enable) {
    // SSR + initial paint + above-the-fold + reduced-motion: just render
    // content. No opacity:0 inline style ships from here.
    return (
      <div
        ref={ref}
        className={className}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsetFor(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "variants" | "ref"
> & {
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Wrap a list of <StaggerItem> children to play them in sequence on scroll. */
export function StaggerContainer({
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  children,
  className,
  ...rest
}: StaggerContainerProps) {
  const reduce = useReducedMotion();
  const { ref, enable } = useEnableScrollReveal();

  if (reduce || !enable) {
    return (
      <div
        ref={ref}
        className={className}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={containerVariants(stagger, delayChildren)}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
};

/**
 * Child of <StaggerContainer>. If the parent container did NOT opt into
 * animation (above the fold), this child renders plain too — keeping the
 * SSR-visible markup intact. If the parent opted in, it picks up the
 * variants and animates with the stagger.
 *
 * We can't read whether the parent opted in directly, so we use the same
 * useEnableScrollReveal heuristic on this child. If parent + child both
 * sit above the fold they both render plain; if both are below the fold
 * the parent drives the stagger correctly. Mixed cases (parent above,
 * child below, or vice versa) are rare and degrade gracefully to "no
 * animation but visible content".
 */
export function StaggerItem({
  direction = "up",
  distance = 20,
  duration = 0.5,
  children,
  className,
  ...rest
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const { ref, enable } = useEnableScrollReveal();

  if (reduce || !enable) {
    return (
      <div
        ref={ref}
        className={className}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
