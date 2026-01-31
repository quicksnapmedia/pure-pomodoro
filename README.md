# Pure Pomodoro

A clean, modern Pomodoro timer application built with Nuxt 4 and Vue 3.

## Project Status

**Last Updated:** January 31, 2026  
**Overall Progress:** 8% Complete (2 of 25 issues completed)

### Completed Features ✅

1. **Timer Countdown Logic** (Issue #1) ✅
   - Framework-agnostic timer core library (`lib/timer-core.js`)
   - Vue composable wrapper (`app/composables/useTimer.ts`)
   - Countdown functionality with status management
   - Support for idle, running, paused, and completed states

2. **Timer Controls Implementation** (Issue #2) ✅
   - Enhanced Timer component with proper button styling
   - Start/Pause toggle functionality
   - Reset button with smart disabled states
   - Accessibility attributes (ARIA labels)
   - Visual feedback with hover/active states and transitions
   - Handles all timer states (idle, running, paused, completed)

### Current Phase: Phase 1 - Core Timer Functionality

**Progress:** 2 of 3 tasks completed (67%)

**Remaining in Phase 1:**
- Session Type Management (Work/Break switching)

### Upcoming Phases

- **Phase 2:** Session Tracking & Progress (0/2)
- **Phase 3:** Settings & Configuration (0/3)
- **Phase 4:** State Persistence (0/2)
- **Phase 5:** User Experience Enhancements (0/3)
- **Phase 6:** PWA & Mobile Features (0/4)
- **Phase 7:** Polish & Responsiveness (0/3)
- **Phase 8:** Testing & Documentation (0/5)

### Technical Stack

- **Framework:** Nuxt 4
- **UI Framework:** Vue 3 (Composition API)
- **Styling:** Sass/SCSS (CSS Snapshot 2024 compliant)
- **TypeScript:** Full type safety
- **Target Browsers:** 2024 evergreen browsers (Chrome, Firefox, Safari, Edge)

### Project Structure

```
pure-pomodoro/
├── app/
│   ├── components/       # Vue components (Timer, Logo, etc.)
│   ├── composables/      # Vue composables (useTimer)
│   ├── pages/            # Nuxt pages
│   └── assets/scss/      # Sass stylesheets
├── lib/                  # Framework-agnostic core logic
└── public/               # Static assets
```

---

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Technical Implementation

- **Target Browsers**: 2024 evergreen browsers (Chrome, Firefox, Safari, Edge).
- **CSS Standards**: [CSS Snapshot 2024](https://www.w3.org/TR/css-2024/).
- **Styling**: Sass/CSS features are restricted to those defined in CSS Snapshot 2024.
