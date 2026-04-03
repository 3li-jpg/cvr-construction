# CVR V5 — Project Guidelines

## Tech Stack
- **Framework:** Next.js (App Router, React, TypeScript strict)
- **Styling:** Tailwind CSS v4 utility classes — no inline styles except for dynamic values driven by JS (e.g. parallax `transform`, scroll-driven `opacity`)
- **Fonts:** System/Google Fonts via `globals.css` — no ad-hoc font imports inside components
- **Icons:** Inline SVG only; no external icon libraries

## Code Style
- TypeScript strict mode — no `any`
- Named exports for all components, PascalCase filenames
- 2-space indentation
- Mobile-first responsive classes (sm → md → lg → xl breakpoints)
- `"use client"` at the top of every component that uses hooks or browser APIs

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| Beige (main bg) | `#f0f0ec` | StudioSection, primary sections |
| Off-white | `#f5f5f0` | Gallery, Projects, Services, Process |
| White | `#ffffff` | Story/content cards |
| Black | `#000000` | Text, buttons, nav |
| Overlay dark | `bg-black/20` | Parallax image overlays |

### Typography
- Headings: `font-black tracking-[-0.03em] uppercase leading-[0.88]` — large, tight, editorial
- Labels: `text-xs font-semibold uppercase tracking-[0.2em]` with a `●` dot prefix
- Body: `text-[0.88rem] md:text-[0.93rem] font-normal leading-[1.75] text-black/60`
- **No drop shadows on text or components** unless explicitly requested

### Buttons
- Pill shape: `rounded-full`
- Primary: `bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black/80 transition-colors`
- With dot accent: `<span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />`
- **No box-shadow / drop-shadow on buttons**

---

## Layout & Spacing Rules

### Section Padding
- Top: `pt-16 md:pt-20` (sections)
- Bottom: `pb-16` **maximum** — avoid `pb-24` or `pb-32` on sections that directly precede a sticky parallax layer; excess bottom padding creates blank dead space before the next section snaps in.

### Stacking / z-index Ladder
```
HeroSection (sticky, z-0)
StudioSection (z-10, bg-[#f0f0ec])
ShowcaseSection (sticky, z-20)
StorySection (z-30, bg-white)
ProjectsSection (z-40, bg-[#f5f5f0])
ServicesSection (z-50, bg-[#f5f5f0])
ProcessSection / Gallery / Journal / Footer (z-[60], bg-[#f5f5f0])
```

The sticky parallax layers (`HeroSection`, `ShowcaseSection`) sit behind their following card sections. Card sections have solid backgrounds so they "cover" the sticky layer as the user scrolls.

---

## Animation Patterns

### `<Reveal>` Component
All above-the-fold text/content uses the `Reveal` component for entrance animations:
```tsx
<Reveal direction="up" delay={0} duration={0.8}>…</Reveal>
<Reveal direction="up" delay={0.1} duration={1} distance={60}>…</Reveal>
```
Direction options: `"up"` | `"right"` | `"left"` | `"down"`

### Parallax Images (Sticky / Full-bleed)
Used for `ShowcaseSection` and any other full-screen sticky image panels:
- Container: `h-screen`, `overflow-hidden`, `position: sticky; top: 0`
- Image: `height: 105%`, `position: absolute`, `top: 0`, `willChange: transform`
- Translate formula: `(progress - 0.5) * -5 * rect.height / 100` px
- Progress: `(vh - rect.top) / (vh + rect.height)` clamped to `[0, 1]`

### Parallax Images (Carousel Cards / Inline)
Used for `GallerySection` cards and any cropped-card parallax:
- Container: `overflow-hidden`, fixed `aspect-ratio`  
- Image: `position: absolute; top: -6%; height: 112%` — oversized by `+12%` to give shift room
- Translate formula: `(clampedProgress - 0.5) * -12 * (rect.height / 100)` px
- Attach `scroll` listener inside a `useEffect`; remove on cleanup

### "We" Scroller (StudioSection)
- Attach `scroll` listener to track `phrasesRef` bounding rect
- `progress` range: element top goes from `75vh` → `10vh`
- `weTranslate = progress * (phrases.length - 1) * 1.2` em (vertical slide)
- `floatPos = progress * (phrases.length - 1)` (phrase opacity fade)
- Phrase opacity: `Math.max(0.1, 1 - |i - floatPos| * 0.65)`

---

## Image Guidelines

### Choosing Unsplash Photos
- **Gallery carousel cards use `aspect-[3/4]` (portrait).** Always pick portrait or square images for carousel slots. Landscape images will appear stretched and elongated — avoid them.
- Prefer interiors, architectural details, and textures over wide exterior shots for gallery cards.
- Recommended search terms: "interior architecture", "luxury home interior", "minimalist bedroom", "architecture detail"

### Image Replacement Rule
If an image looks wrong (stretched, too tall, wrong crop), replace it — do not just resize the container. Pick a new image that naturally matches the container's aspect ratio.

---

## What NOT to Do
- ❌ Do not add `box-shadow` or `drop-shadow` to buttons, cards, or nav elements
- ❌ Do not use `pb-32` or larger bottom padding on sections that sit directly above a sticky parallax layer
- ❌ Do not use landscape Unsplash photos inside portrait (`aspect-[3/4]`) containers — they stretch vertically
- ❌ Do not add `position: relative` to sticky parallax wrappers (breaks stacking)
- ❌ Do not use inline `style` for static values — only for JS-driven dynamic values

---

## Adding New Sections
1. Create `src/components/MySectionName.tsx` with `"use client"` if needed
2. Follow the color/padding/typography system above
3. Add to `page.tsx` with the correct `relative z-[N] bg-[…]` wrapper
4. Update the z-index ladder in this file if the stacking order changes
