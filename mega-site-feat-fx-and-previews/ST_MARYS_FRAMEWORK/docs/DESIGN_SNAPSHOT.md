# Design Snapshot: St Mary's House Dental Care

This document records the core visual tokens, component behaviours and accessibility considerations extracted from the provided design reference images.  The intention is to provide a single source of truth for future development so that all components can be styled consistently via Tailwind and CSS custom properties rather than hard‑coded colours.

## Palette

| Token           | Hex    | Description                                                    |
|-----------------|--------|----------------------------------------------------------------|
| `primary`       | `#C2185B` | Bright magenta used for high‑energy accents and call‑to‑action elements. |
| `secondary`     | `#40C4B4` | Calm turquoise that complements the magenta and provides balance. |
| `accent`        | `#D4AF37` | Rich gold reserved for luxurious highlights and outlines.     |
| `background`    | `#F7F7F9` | Default page background in the light theme.                   |
| `foreground`    | `#1A1C1F` | Default text colour in the light theme.                       |
| `background‑ink`| `#1A1C1F` | Dark/“Ink” theme background.                                  |
| `foreground‑ink`| `#F7F7F9` | Dark/“Ink” theme text colour.                                 |

The palette also includes neutral greys for muted text and borders.  These colours are defined as CSS variables in `globals.css` and consumed via `hsl(var(--primary))` etc. to support automatic dark‑mode inversion.

## Gradients

Several gradients are used throughout the design.  These should be defined in CSS and referenced through Tailwind’s `bg-gradient-to‑*` utilities.

* **Coastal gradient** – Linear gradient at 135° blending magenta → turquoise → gold.  Used for hero headings and decorative backgrounds.
* **Primary gradient** – Magenta → turquoise.  The default button background.
* **Secondary gradient** – Turquoise → gold.  Used for alternate actions and some icon backgrounds.
* **Outline gradient** – Gold border with a transparent or glassy fill; often paired with a subtle shadow.

## Typography

| Token        | Font        | Usage                              |
|-------------|------------|------------------------------------|
| `heading`   | Montserrat | Bold sans–serif for all headings (h1–h6).  Sizes scale from `text‑4xl` up to `text‑6xl` for the hero. |
| `body`      | Lora       | Elegant serif for body copy and paragraph text. |

Tailwind utility classes such as `heading‑xl`, `heading‑lg`, `heading‑md`, `body‑md` etc. are defined in `globals.css` to encapsulate these scales.  This separation of font and size makes it easy to adjust typographic rhythm in one place.

## Radii & Spacing

The design uses generous rounding and spacing to convey warmth and softness:

* Base radius is defined via `--radius: 0.75rem`.  Cards often use larger radii (e.g. `rounded‑2xl`) and pill‑shaped buttons may use fully rounded corners.
* Vertical section spacing is generous (4–6 rem on desktop) to allow content to breathe.
* Cards and buttons include internal padding of `0.75rem`–1.25rem` depending on size.

## Shadows & Effects

* **Card shadow** – Soft diffused drop shadow (`0 10px 25px rgba(0,0,0,0.1)`) gives cards a floating feel.
* **Button glow** – Buttons exhibit a subtle coloured glow on hover that matches the underlying gradient.
* **Shimmer** – Many elements use a shimmering overlay (diagonal gradient moving across) to convey luxury.  This effect should be disabled when `prefers‑reduced‑motion` is active.
* **Sparkles & Particles** – Interactive buttons emit small sparkles that float away on hover.  Use Framer Motion for animation with a CSS fallback.

## Component Notes

### SparkleButton

A call‑to‑action button with animated sparkles and shimmer.  It supports three variants:

1. **Primary** – Gradient background from `primary` to `secondary` with white text.
2. **Magenta** – Reverse gradient (secondary → primary) with white text.
3. **Outline** – Transparent/glass background with a 2 px `accent` border and `accent` coloured text.

Sizes `md` and `lg` adjust padding and font size.  The component uses Framer Motion for scale and opacity animations on hover and tap.  A CSS shimmer overlay animates across the button.  When `prefers‑reduced‑motion` is detected, sparkles and motion effects are disabled; only the gradient and hover colour change remain.  Keyboard focus triggers a 2 px ring using the primary colour.

### GlowCard

A reusable card container with a translucent backdrop (`bg‑white/80` in light mode, `bg‑white/10` in ink mode) and backdrop blur (`backdrop‑blur‑sm`).  It has a gentle drop shadow and lifts (`‑translate‑y‑1`) with an intensified shadow on hover.  Optionally, a subtle border using `accent` can be added for emphasis.

### ShimmerText

Text component that animates a gradient fill across the text.  It uses the coastal gradient and repeats slowly.  If motion is reduced, the gradient is static.  This is used for hero headlines and key phrases.

### WaveBackground

A decorative backdrop that renders a subtle animated wave or particle field using only GPU‑friendly CSS transforms.  The animation uses keyframes to move gradients and masks.  When `prefers‑reduced‑motion` is active, the animation is disabled and a static wave image from the provided `waves‑background‑REDO.zip` is used instead.

### ParallaxSection

Container that adds a small parallax translation to its background imagery as the user scrolls.  This effect is implemented via Framer Motion or CSS transform and is disabled for users who prefer reduced motion.

### Chips/Tags

Small pill‑shaped badges used for labels (e.g. “Interactive Technology”).  They employ gradient backgrounds (primary → secondary or secondary → accent) and white text, with slight padding (`px‑3 py‑1`), uppercase Montserrat font and rounded‑full corners.

## Accessibility & Motion

All interactive components respect `prefers‑reduced‑motion` by switching off animations and sparkles.  Focus states are clearly indicated with a ring using the primary colour and a ring offset.  Colours meet WCAG AA contrast requirements in both light and ink themes.

## Implementation Guidance

* Expose the above tokens as CSS variables in a dedicated stylesheet (e.g. `styles/tokens.css`) and import it globally so that components can refer to them via Tailwind’s `hsl(var(--token))` syntax.
* Avoid hardcoding hex values in React components; instead, use Tailwind classes that reference these variables (e.g. `bg-gradient-to-r from-primary to-secondary`).
* Use the existing `globals.css` as a foundation.  Extend `tailwind.config.js` only if new tokens or animations are required.

This snapshot should be updated if the design evolves to ensure that development remains aligned with the visual reference.
