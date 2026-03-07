# Microphone Button Component Spec
## For Cursor using Gemini Flash 3

## 1. Intent
Build a premium microphone button component for the RECITE web app.

This component must look like a polished Apple / Google-inspired dark-mode control:
- circular main microphone button
- dark smoked-glass shell
- soft red glow from below
- subtle top reflected light
- gentle floating shadow
- premium white microphone glyph
- restrained motion for hover, press, and listening states

The goal is not a generic icon button.
The goal is a visually distinctive primary action control that feels tactile, calm, and premium on iPhone Safari and desktop web.

---

## 2. Definition of Done
This task is complete when:

- a reusable React microphone button component exists
- the component renders correctly in dark mode
- the button has layered lighting effects:
  - shell gradient
  - top reflection
  - red lower glow
  - soft outer shadow
- the button supports these states:
  - idle
  - hover
  - pressed
  - listening
  - disabled
- the component is responsive and touch-friendly on iPhone
- the icon is centered and optically balanced
- the effect is built with CSS and lightweight motion, not canvas or WebGL
- the code is modular and typed
- the component can be dropped into the existing UI without rewriting it

---

## 3. In Scope
Build only the microphone button control and its immediate visual support layers.

Included:
- main circular mic button
- mic icon
- glow and reflection layers
- hover / tap / listening motion
- typed props
- CSS module or scoped styling
- demo usage example

---

## 4. Out of Scope
Do not build:

- full page layout
- recording logic
- speech recognition logic
- waveform visualizer
- analytics
- sound effects
- haptics
- settings panel
- non-dark theme variant
- full design system

---

## 5. Design Goal
The button should feel like:

- black glass
- softly lit from above
- red energy glow from below
- precise white icon floating in the center
- expensive, calm, and tactile
- highly legible on a near-black background

The visual tone should sit between:
- Apple dark UI controls
- Google Material restraint
- premium hardware-inspired lighting

Do not make it toy-like, neon-heavy, or gaming-themed.

---

## 6. Required States

### idle
- dark glass shell
- subtle red lower bloom
- low-intensity top reflection
- white mic icon
- soft shadow

### hover
- very slight lift
- slightly stronger shell contrast
- slightly stronger red glow
- no exaggerated scale

### pressed
- slight scale down
- glow tightens slightly
- shadow compresses
- icon remains stable and centered

### listening
- breathing pulse in red lower glow
- shell stays controlled and premium
- mic remains readable
- no aggressive flashing

### disabled
- reduced contrast
- reduced glow
- muted icon
- cursor and interaction disabled

---

## 7. UX Rules
- The mic button is the primary action.
- It must be immediately noticeable without becoming loud.
- The button must be touch-friendly on iPhone.
- Hit area must be at least 56x56 px; preferred visible size 72 to 92 px.
- Motion must remain subtle.
- The listening state should be understandable within 1 second.

---

## 8. Technical Stack
Preferred stack:
- React
- TypeScript
- CSS Modules or equivalent scoped CSS
- Framer Motion for motion
- SVG mic icon or lucide-react microphone icon
- clsx for state class composition if needed

Do not introduce heavy dependencies.

---

## 9. File Structure
Create files like:

```txt
src/components/MicButton/
  MicButton.tsx
  MicButton.module.css
  MicButton.types.ts
  MicButton.demo.tsx
```

Optional:

```txt
src/components/MicButton/icons/
  MicGlyph.tsx
```

---

## 10. Public API

Use typed props.

```ts
export type MicButtonState = "idle" | "hover" | "pressed" | "listening" | "disabled";

export interface MicButtonProps {
  state?: MicButtonState;
  size?: number;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}
```

Rules:
- `size` controls visible diameter
- default size should be around 84
- disabled prop overrides interactive state
- component must remain accessible

---

## 11. Visual Construction
The component must be built from layered elements.

Recommended structure:

```txt
button root
  glow layer
  shadow layer
  shell
    top reflection
    inner rim
    icon wrapper
      mic icon
```

### Required visual layers

#### 1. Shell
Main circular body.
Use a radial gradient:
- slightly lighter center
- darker perimeter
- subtle transparent depth
- premium smoked-glass feel

#### 2. Top reflection
Use a pseudo-element or dedicated layer.
This must:
- sit in upper arc only
- be soft and low-opacity
- suggest reflected ambient light
- not read as a hard stripe

#### 3. Lower red glow
Use at least two glow layers:
- a tighter red edge tint near lower shell
- a broader softer red bloom beneath and behind the button

#### 4. Floating shadow
Soft, broad, subtle.
Must make the button feel lifted from the background.

#### 5. Icon
Mic glyph must be:
- centered
- bright white or near-white
- optically balanced
- slightly thick for small-screen clarity

---

## 12. Color Guidance
Assume page background is near-black, approximately:

```txt
#050505 to #0A0A0A
```

Suggested button palette:
- shell light: rgba(255,255,255,0.10)
- shell mid: rgba(255,255,255,0.06)
- shell dark: rgba(0,0,0,0.55)
- border: rgba(255,255,255,0.08)
- icon: rgba(255,255,255,0.96)
- glow red core: rgba(255,80,95,0.28)
- glow red bloom: rgba(255,70,90,0.16)

These values may be tuned, but keep the overall tone restrained.

---

## 13. Motion Guidance
Use Framer Motion only for subtle interaction and breathing pulse.

### hover motion
- scale: about 1.01 to 1.02
- y offset: about -1 px
- duration: fast but soft

### pressed motion
- scale: about 0.97 to 0.985
- y offset: 0 to 1 px
- shadow reduced slightly

### listening motion
Animate glow opacity and scale gently:
- pulse period: about 1.8 to 2.6 seconds
- avoid strobe effect
- do not animate icon wildly

Do not over-animate.

---

## 14. Accessibility Requirements
- root must be a real `button`
- include `aria-label`
- keyboard focus visible
- disabled state must be semantic
- contrast must remain strong
- visible size and hit target must suit touch use

Focus ring should be subtle and premium, not browser-default if custom styling is used.

---

## 15. Implementation Warnings
Do not:

- build this as a generic flat icon button
- use a single box-shadow and call it done
- hardcode recording logic inside the component
- use canvas, WebGL, or heavy rendering libraries
- overuse blur so the button looks muddy
- make the red glow too saturated or too large
- use overly glossy fake plastic styling
- make hover and listening states too dramatic
- use `any` in component types
- bury business logic inside CSS hacks

---

## 16. Build Order
Build in this order:

1. Create typed component shell with props
2. Render dark circular button with centered icon
3. Add shell gradient and border
4. Add top reflection layer
5. Add lower red edge tint and bloom
6. Add floating shadow
7. Add hover and pressed states
8. Add listening pulse
9. Add disabled style
10. Add demo file and quick usage example
11. Refine proportions on mobile

Do not skip to animation before the static visual quality is correct.

---

## 17. Acceptance Criteria
The component passes when:

- it reads clearly as the primary microphone control
- it feels premium on a near-black background
- it has visible reflected top light
- it has visible but restrained red lower glow
- hover and pressed states feel subtle and polished
- listening state is clearly distinguishable
- it works well on iPhone Safari
- it is reusable and typed
- it can be placed into the RECITE UI without redesigning the component

---

## 18. Demo Requirement
Include a small demo usage showing:
- idle
- listening
- disabled

The demo background should match the app dark background so the lighting is testable.

---

## 19. Notes for Gemini Flash 3
- Prefer visual precision over abstraction.
- Prefer small layered elements over one overloaded element.
- Use pseudo-elements where they improve the reflection/glow quality.
- Keep the component self-contained.
- Do not invent extra product features.
- Tune gradients and shadows by eye until the result feels premium.
- Match the reference image closely in overall mood, not necessarily pixel-for-pixel.

---

## 20. Optional Nice-to-Have
If simple and clean, allow a `glowColor` prop later.
Do not implement this unless the base component is already correct.
