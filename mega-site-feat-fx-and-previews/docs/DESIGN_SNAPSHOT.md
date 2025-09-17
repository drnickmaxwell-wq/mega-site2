# Design Snapshot

## Palette
- **Primary (Magenta)**: `#C2185B` — rich magenta used for highlights and gradients.
- **Secondary (Teal/Turquoise)**: `#40C4B4` — fresh teal/turquoise used alongside magenta.
- **Accent (Gold)**: `#D4AF37` — warm gold accent used sparingly for luxe highlights.
- **Neutral Light**: `#F9F9F9` — very light grey background for light theme panels.
- **Neutral Dark**: `#0A0A0A` — near‑black for dark theme backgrounds.
- **Other neutrals**: `#2D2D2D` (dark charcoal) and `#F1F1F1` (off‑white) for intermediate tones.

### Gradients
- **Magenta → Teal**: linear gradient from magenta to teal with a hint of gold in the mid‑tones. Used for hero backgrounds and primary buttons.
- **Footer Gradient**: deep magenta blending into dark teal for the footer and ink theme backgrounds.

## Typography
- **Headings**: Lora, serif. Sizes range from 3rem (H1) down to 1rem (H6) with tighter line height. Used for the hero heading and section titles.
- **Body**: Montserrat, sans‑serif. Typical sizes 1rem–1.125rem with relaxed line height for readability.
- **Uppercase Nav**: letter spacing slightly loose for menu items; medium to bold weights.

## Radii & Shapes
- **Buttons**: pill shaped with fully rounded corners (9999px radius).
- **Cards**: 0.75rem (12px) corner radius; subtle inner border and shadow.
- **Chips/Badges**: approx. 1rem radius.
- **Inputs**: 0.5rem radius for form fields.

## Shadows & Glow
- **Soft Card Shadow**: `0 4px 16px rgba(0,0,0,0.05)` used on cards and feature boxes.
- **Glow Accent**: outer shadow using the accent colour with blur, e.g. `0 0 8px 2px rgba(212,175,55,0.5)` for gold glow.

## Shimmer & Sparkle
- **Shimmer Text**: animated linear‑gradient mask moving left→right over text to create a shimmering highlight. Reduced‑motion users see a static gradient overlay instead.
- **Sparkle**: small confetti‑like particles in primary and accent colours emanate from buttons and icons, with opacity and scale animation. Disabled when `prefers-reduced-motion`.

## Components
- **SparkleButton**: gradient background (primary→secondary or magenta→teal) with optional gold outline. Sizes: md (~44px high) and lg (~56px high). Includes focus‑visible ring and reduces animation when motion is disabled.
- **WaveBackground**: animated canvas drawing coastal waves and confetti using the brand colours. It fades at the top with a gradient mask and is disabled for users with reduced motion.
- **ShimmerText**: wraps children in a component that applies the shimmer effect. Falls back to a static gradient in reduced‑motion mode.
- **GlowCard**: card with soft shadow and a glowing border accent; lifts and brightens slightly on hover.
- **ParallaxSection**: section wrapper that applies slow parallax movement to background and foreground layers using `framer-motion`. Provides a CSS transform fallback.

These tokens are derived from the provided design screenshots and the project’s Tailwind configuration【311751975433276†L18-L139】, and they should be kept in sync with both Light and Ink themes.
