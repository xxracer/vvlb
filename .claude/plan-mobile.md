# Plan: Mobile Responsive Fixes

## Problem
On mobile screens the site still does not adapt well. Layout feels broken and hard to use.

## Evidence from testing (iPhone SE 375×667 and 320×568 viewports)
- **No horizontal overflow** was detected on any public page (`scrollWidth === viewportWidth`).
- **Services page (`/services`)** is the biggest problem: it renders **75 service cards at once**, producing a page ~**42,000 px tall**. Scrolling through 75 cards on a phone is overwhelming and is the main thing that "breaks" the mobile experience.
- **Book page (`/book`)** uses a body-map with 96 px circular touch targets stacked very close together on mobile; tapping the right area is hard, and the instructions say "diagram on the left" while on phones the diagram is above the list.
- **Hero section** title is very large (`text-6xl` / `lg:text-[6.5rem]` with `leading-[0.9]`) and dominates the viewport on small screens.
- **Specials page** card images render as broken 600×400 placeholders because `SpecialCard` uses the deprecated Next.js `layout="fill"` prop.
- **Schedule page** content is an Acuity error on the test environment, but the iframe container also needs safer mobile containment.

## Goals
1. Stop showing all 75 services by default on mobile (and desktop); make `/services` browsable.
2. Make the booking body-map usable on mobile: bigger touch targets, clearer layout/instructions.
3. Make the hero more compact and readable on small screens without breaking the desktop look.
4. Fix broken specials images.
5. Contain the scheduler iframe so it never forces horizontal scroll on any device.

## Proposed approach

### 1. `/services` – default to a category-first view
- Change the initial `category` state from `null` to `'women'`.
- Remove the "show all services" fallback; when no category is selected, show a message/prompt instead.
- Keep the sub-category filter (`Face / Mid Body / Lower Body`) but make the buttons wrap (`flex-wrap`) so they never overflow.
- Add a "Show All" button for users who really want the full list.
- This reduces the initial mobile view from 75 cards to a manageable subset and fixes the 42,000 px scroll problem.

### 2. `/book` (`AcuityScheduler`) – mobile-friendly body map
- Increase the touch target size on small screens (`w-28 h-28` / `w-32 h-32` below `sm`).
- Add more vertical spacing between the three area buttons so they do not overlap/touch.
- Update instructions to say "diagram above" on mobile (use a responsive text switch).
- Make the selected services list take the full width and use `min-w-0` on the text column so long service names do not force overflow.

### 3. `HeroSection` – tame the mobile hero
- Reduce headline size on the base breakpoint: `text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem]`.
- Keep the gradient and style; only the scale changes.
- Reduce trust-badge padding/icon size slightly on small screens or allow them to wrap more cleanly.
- Keep the watermark logo but clamp its max size more reasonably (the `max-w-[70000px]` values are nonsense and can be removed).

### 4. `SpecialCard` – fix image rendering
- Replace deprecated `layout="fill"` with the Next.js 13/15 `fill` prop.
- Keep the existing `relative w-full h-48` container so the card height stays fixed.

### 5. `/schedule` iframe containment
- Wrap the iframe in `overflow-hidden rounded-lg` and give it `max-w-full`.
- Keep `width="100%"` and a reasonable mobile height (e.g., `h-[700px] sm:h-[800px]`).

## Files to modify
1. `src/app/(main)/services/page.tsx`
2. `src/components/shared/AcuityScheduler.tsx`
3. `src/components/sections/HeroSection.tsx`
4. `src/components/shared/SpecialCard.tsx`
5. `src/app/(main)/schedule/page.tsx`

## Files to create
- None.

## Verification
- Re-run the Playwright mobile screenshots and confirm `/services` height drops from ~42,000 px to a reasonable value.
- Confirm no horizontal overflow at 320 px, 375 px, and 768 px viewports.
- Confirm specials images load correctly.
- Run `npm run typecheck` before finishing.
