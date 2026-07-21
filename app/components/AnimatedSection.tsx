"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "footer";
}

// Reusable animated child for staggering inner content
interface AnimatedChildProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "top" | "bottom" | "left" | "right" | "fade" | "pop-up" | "scale-up";
}

export function AnimatedChild({
  children,
  className,
  delay = 0,
  from = "bottom",
}: AnimatedChildProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px", amount: 0.1 });

  const initial = {
    top: { opacity: 0, y: -40 },
    bottom: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    fade: { opacity: 0 },
    "pop-up": { opacity: 0, y: 100, scale: 0.9 },
    "scale-up": { opacity: 0, scale: 0.85 },
  }[from];

  const animate = {
    top: { opacity: 1, y: 0 },
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    fade: { opacity: 1 },
    "pop-up": { opacity: 1, y: 0, scale: 1 },
    "scale-up": { opacity: 1, scale: 1 },
  }[from];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className,
  as = "section",
}: AnimatedSectionProps) {
  const Tag = as as any;

  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
}
