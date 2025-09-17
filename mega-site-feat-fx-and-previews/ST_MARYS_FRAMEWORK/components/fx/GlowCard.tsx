"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverScale?: boolean;
  glow?: boolean;
}

export function GlowCard({ children, className = "", hoverScale = true, glow = true, ...props }: GlowCardProps) {
  const baseClasses =
    "relative overflow-hidden rounded-2xl p-6 bg-white/80 dark:bg-slate-900/80 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur";
  const scaleClasses = hoverScale ? "hover:scale-[1.02] transition-transform duration-300" : "";
  const glowClasses = glow
    ? "hover:shadow-[0_0_25px_rgba(194,24,91,0.3)] dark:hover:shadow-[0_0_25px_rgba(194,24,91,0.5)]"
    : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={[baseClasses, scaleClasses, glowClasses, className].join(" ").trim()}
      {...props}
    >
      {/* shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
