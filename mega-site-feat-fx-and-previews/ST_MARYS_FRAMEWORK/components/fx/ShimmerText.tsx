"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ShimmerTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

export function ShimmerText({ as: Component = "span", children, className, ...props }: ShimmerTextProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <Component className={`relative inline-block overflow-hidden ${className ?? ""}`} {...props}>
      <span className="relative z-10">{children}</span>
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ mixBlendMode: "overlay" }}
        />
      )}
    </Component>
  );
}
