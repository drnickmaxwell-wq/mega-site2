"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxSection({ children, className = "", speed = 0.3, direction = "up", ...props }: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const transform = useTransform(
    scrollY,
    [0, 1000],
    direction === "up" ? [0, -speed * 100] : [0, speed * 100]
  );
  const springY = useSpring(transform, { stiffness: 80, damping: 30 });
  return (
    <motion.div
      className={className}
      style={{ y: springY }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
