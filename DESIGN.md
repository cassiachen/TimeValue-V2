---
name: Quiet Precision
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#46464a'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#77767b'
  outline-variant: '#c7c6ca'
  surface-tint: '#5f5e60'
  primary: '#030304'
  on-primary: '#ffffff'
  primary-container: '#1d1d1f'
  on-primary-container: '#868587'
  inverse-primary: '#c8c6c8'
  secondary: '#5e5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#000502'
  on-tertiary: '#ffffff'
  tertiary-container: '#002315'
  on-tertiary-container: '#009869'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1b1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c7c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  margin-page: 24px
  gutter-card: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is anchored in the philosophy of "Quiet Precision"—a premium, human-centered aesthetic designed for the discerning user of the "时值 TimeValue" WeChat Mini Program. The brand personality is elegant and understated, prioritizing content over chrome. 

The visual style is **Minimalist** with a strong influence from high-end consumer hardware interfaces (Apple-inspired). It utilizes expansive whitespace, a strictly controlled color palette, and a focus on optical balance. The goal is to evoke a sense of calm, reliability, and intellectual clarity, transforming time management from a chore into a reflective experience.

## Colors

The palette is monochromatic and high-contrast to ensure maximum legibility and a "gallery" feel.

- **Primary (#1d1d1f):** Used for headlines and primary body text. It is a deep charcoal, softer than pure black to reduce eye strain while maintaining a premium feel.
- **Secondary (#86868b):** A neutral gray reserved for secondary information, metadata, and placeholder text.
- **Accent (#10b981):** A sophisticated emerald green used exclusively for positive growth, completion states, or progress indicators. It must be used sparingly to maintain its impact.
- **Background (#ffffff):** The primary canvas. Surfaces are layered using a very light gray (#f5f5f7) to denote depth without relying on heavy borders.

## Typography

Typography is the primary driver of the UI hierarchy. This design system uses **Inter** for its modern, neutral, and highly legible characteristics.

- **Hierarchy:** Use bold weights for headlines to create a clear "path" for the eye. 
- **Tracking:** Large display titles should use a slight negative letter-spacing (-0.02em) to feel tighter and more authoritative.
- **Contrast:** Maintain a strict distinction between the Primary (#1d1d1f) and Secondary (#86868b) colors to signify importance.
- **WeChat Integration:** For Chinese characters, fallback to system fonts (PingFang SC), ensuring weight matching remains consistent with the Latin characters.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous safe areas to prevent the UI from feeling cramped.

- **Margins:** A standard 24px horizontal margin is applied to all screens to create a centered, focused column of content.
- **Rhythm:** All spacing is based on a 4px baseline grid. Vertical rhythm should favor larger gaps (32px+) between major sections to emphasize the "quiet" nature of the app.
- **Mini Program Constraints:** Ensure all primary interactions are within the center "safe zone," avoiding the top navigation bar and bottom home indicator areas of modern smartphones.

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layers** and extremely soft ambient shadows.

- **Surfaces:** Use #f5f5f7 for background containers to separate cards from the pure white (#ffffff) page background.
- **Shadows:** When elevation is required (e.g., a floating action button or a primary card), use a multi-layered, diffused shadow: `box-shadow: 0 10px 30px rgba(0,0,0,0.04);`. The shadow should feel like a soft blur rather than a dark outline.
- **Transitions:** Use subtle opacity shifts and vertical translations (2-4px) to indicate interaction rather than harsh color changes.

## Shapes

The shape language is sophisticated and approachable.

- **Base Radius:** Most components (cards, buttons) use a 16px radius.
- **Large Radius:** Primary hero sections or container cards use a 24px radius (`rounded-xl`).
- **Pill Shapes:** Reserved for small status chips or tags to differentiate them from interactive buttons.
- **Consistency:** Avoid mixing sharp corners with rounded ones; every container should have a consistent corner radius to maintain a "soft" tactile feel.

## Components

- **Buttons:** Primary buttons use the Primary color (#1d1d1f) with white text. They should be tall (52px) with a 16px radius. Secondary buttons should be transparent with a very thin (1px) #e5e5e7 border.
- **Cards:** Content is grouped in white cards on a light gray background. Cards should have no borders and utilize the soft ambient shadow defined in the Elevation section.
- **Progress Bars:** Thin, elegant lines using the Accent color (#10b981) for the fill and the Neutral color (#f5f5f7) for the track. Avoid rounded ends for the progress fill to keep it looking precise.
- **Input Fields:** Minimalist design with only a bottom border of 1px (#e5e5e7) that darkens to #1d1d1f on focus. Label text remains small and gray above the input.
- **Chips/Tags:** Used for categorization, these should have a light gray background (#f5f5f7) and small, uppercase typography for a technical, precise look.
- **Lists:** Use generous vertical padding (20px+) between list items and avoid full-width dividers. Use "inset" dividers that stop short of the screen edges to maintain whitespace.