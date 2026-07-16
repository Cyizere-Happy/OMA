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
  from?: "bottom" | "left" | "right" | "fade";
}

export function AnimatedChild({
  children,
  className,
  delay = 0,
  from = "bottom",
}: AnimatedChildProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    bottom: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    fade: { opacity: 0 },
  }[from];

  const animate = {
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    fade: { opacity: 1 },
  }[from];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
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
  delay = 0,
  as = "section",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Tag = motion[as] as typeof motion.section;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
