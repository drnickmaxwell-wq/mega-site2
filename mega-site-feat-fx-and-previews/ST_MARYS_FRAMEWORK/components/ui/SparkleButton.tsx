"use client"

import React, { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface SparkleButtonProps {
  /** Button contents */
  children: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Colour variant.  Primary uses the coastal brand gradient; magenta reverses it; outline uses a gold border. */
  variant?: 'primary' | 'magenta' | 'outline'
  /** Size of the button. */
  size?: 'md' | 'lg'
  /** Additional class names */
  className?: string
  /** Disable button */
  disabled?: boolean
}

/**
 * SparkleButton
 *
 * A call‑to‑action button with subtle shimmer and floating sparkles.  Motion
 * animations are automatically disabled when the user prefers reduced motion.
 *
 * Variants:
 *  - `primary`: gradient from primary → secondary
 *  - `magenta`: gradient from secondary → primary
 *  - `outline`: transparent/glassy background with gold border and text
 *
 * Sizes:
 *  - `md`: medium padding and font
 *  - `lg`: large padding and font
 */
export function SparkleButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: SparkleButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  // Precompute sparkle positions to avoid re‑randomising on every render
  const sparkles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }))
  }, [])

  const variantClasses = () => {
    switch (variant) {
      case 'magenta':
        // Reverse of the primary gradient
        return 'bg-gradient-to-r from-secondary to-primary text-white'
      case 'outline':
        return 'bg-white/10 dark:bg-white/5 border-2 border-accent text-accent backdrop-blur-sm'
      case 'primary':
      default:
        return 'bg-gradient-to-r from-primary to-secondary text-white'
    }
  }

  const sizeClasses = () => {
    switch (size) {
      case 'lg':
        return 'px-8 py-4 text-lg rounded-2xl'
      case 'md':
      default:
        return 'px-6 py-3 text-base rounded-xl'
    }
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-semibold overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${variantClasses()} ${sizeClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={!disabled && !prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!disabled && !prefersReducedMotion ? { scale: 0.97 } : {}}
    >
      {/* Sparkles */}
      {!prefersReducedMotion && sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute bg-accent rounded-full pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={hovered ? { opacity: [0, 1, 0], scale: [0, 1, 0] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: sparkle.delay }}
        />
      ))}

      {/* Shimmer overlay */}
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 shimmer-overlay"
          animate={hovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
          transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
        />
      )}

      {/* Button contents */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
