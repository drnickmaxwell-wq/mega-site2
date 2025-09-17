"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface WaveBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = "", children }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!prefersReducedMotion ? (
        <motion.div
          className="absolute inset-0"
          // Animate background position to create a subtle wave motion
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{
            backgroundSize: "400% 400%",
            backgroundImage:
              "linear-gradient(135deg, rgba(64,196,180,0.12) 25%, transparent 25%),\n                linear-gradient(225deg, rgba(194,24,91,0.12) 25%, transparent 25%),\n                linear-gradient(45deg, rgba(212,175,55,0.08) 25%, transparent 25%),\n                linear-gradient(315deg, rgba(64,196,180,0.08) 25%, rgba(194,24,91,0.08) 25%)",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(64,196,180,0.08), rgba(194,24,91,0.08))",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};

WaveBackground.displayName = "WaveBackground";

export { WaveBackground };
