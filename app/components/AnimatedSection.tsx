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
  from?: "bottom" | "left" | "right" | "fade" | "pop-up" | "scale-up";
}

export function AnimatedChild({
  children,
  className,
  delay = 0,
  from = "bottom",
}: AnimatedChildProps) {
  const initial = {
    bottom: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    fade: { opacity: 0 },
    "pop-up": { opacity: 0, y: 100, scale: 0.9 },
    "scale-up": { opacity: 0, scale: 0.85 },
  }[from];

  const animate = {
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    fade: { opacity: 1 },
    "pop-up": { opacity: 1, y: 0, scale: 1 },
    "scale-up": { opacity: 1, scale: 1 },
  }[from];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: false, amount: 0.15, margin: "0px" }}
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
  delay = 0,
  as = "section",
}: AnimatedSectionProps) {
  const Tag = motion[as] as any;

  return (
    <Tag 
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15, margin: "0px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </Tag>
  );
}
