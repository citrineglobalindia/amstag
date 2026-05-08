// Reusable scroll-triggered motion primitives built on framer-motion.
// Keeps animations consistent across the site and respects prefers-reduced-motion.
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const offsetFor = (dir: RevealDirection, distance: number) => {
  switch (dir) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return {};
  }
};

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition" | "variants"> & {
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
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...offsetFor(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants"> & {
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
  ...rest
}: StaggerContainerProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={containerVariants(stagger, delayChildren)}
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

/** Child of <StaggerContainer>. Inherits animation timing from the container. */
export function StaggerItem({
  direction = "up",
  distance = 20,
  duration = 0.5,
  children,
  ...rest
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
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
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
