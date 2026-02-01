# Pure Pomodoro

A clean, modern Pomodoro timer application built with Nuxt 4 and Vue 3.

## Project Status

**Last Updated:** February 1, 2026  
**Overall Progress:** 36% Complete (9 of 25 issues completed)

### Completed Features ✅

1. **Timer Countdown Logic** (Issue #1) ✅
   - Framework-agnostic timer core library (`lib/timer-core.js`)
   - Vue composable wrapper (`app/composables/useTimer.ts`)
   - Countdown functionality with status management
   - Support for idle, running, paused, and completed states

2. **Timer Controls Implementation** (Issue #3) ✅
   - Enhanced Timer component with proper button styling
   - Start/Pause toggle functionality
   - Reset button with smart disabled states
   - Accessibility attributes (ARIA labels)
   - Visual feedback with hover/active states and transitions
   - Handles all timer states (idle, running, paused, completed)
   - Bug fix: Reset timer when duration changes in completed state

3. **Session Type Management** (Issue #3) ✅
   - Track and display Work/Break session types
   - Dynamic switching between session types
   - Session type state management

4. **Session Counter Logic** (Issue #13) ✅
   - Track completed work sessions
   - Display current session count
   - Session counter state management

5. **Session Type Switching on Completion** (Issue #14) ✅
   - Automatic session type switching after timer completion
   - Manual start required for next session
   - Counter displays 4/4 during long break

6. **Settings Page UI** (Issue #10) ✅
   - Settings page component (`app/pages/settings.vue`) with all configuration inputs
   - Settings page styles (`app/assets/scss/pages/_settings.scss`) integrated into main SCSS
   - Work duration input (default: 25 minutes, range: 1-60)
   - Short break duration input (default: 5 minutes, range: 1-30)
   - Long break duration input (default: 15 minutes, range: 5-60)
   - Long break frequency input (default: 4 sessions, range: 2-10)
   - Sound selection dropdown (Default, Bell, Chime, None)
   - Theme selector dropdown (Auto, Light, Dark)
   - Responsive layout matching existing design patterns
   - Accessible form inputs with labels and help text
   - Light/dark theme support using CSS `light-dark()` function
   - Back navigation link and footer navigation
   - Uses relative units (rem) throughout per project standards
   - PR #31 merged to main

7. **Settings State Management** (Issue #6) ✅
   - Created `useSettings` composable (`app/composables/useSettings.ts`)
   - Centralized settings management for all application settings
   - Reactive computed refs for easy component binding
   - Settings: work duration, short break, long break, long break frequency, sound, theme
   - Theme application with proper `color-scheme` handling for `light-dark()` CSS function
   - Integrated settings with `useSessionType` composable for dynamic durations
   - Updated settings page to use composable instead of local state
   - Updated timer components to use settings for durations and long break frequency
   - Settings currently stored in memory (persistence will be added in Phase 4)
   - PR #32 merged to main

8. **Apply Settings to Timer** (Issue #11) ✅
   - Settings integrated with timer through `useSessionType` composable
   - Timer durations automatically use settings values (work, short break, long break)
   - Timer updates when settings change (when timer is idle or completed)
   - All settings are reactive and update timer durations in real-time
   - Long break frequency from settings integrated with session counter
   - Completed as part of PR #32

9. **Timer State Persistence** (Issue #15) ✅
   - Comprehensive state persistence using localStorage (`app/utils/storage.ts`)
   - Timer state persistence (timeRemaining, status, timestamp, duration)
   - Session counter persistence across page reloads
   - Session type persistence (remembers Work/Short Break/Long Break)
   - Running timers restore as paused with elapsed time calculation
   - Duration validation (resets if settings changed)
   - Graceful fallbacks for unavailable localStorage
   - PR #33 merged to main

### Current Phase: Phase 4 - State Persistence

**Phase 1 Complete:** ✅ All 3 tasks completed (100%)
**Phase 2 Complete:** ✅ All 2 tasks completed (100%)
**Phase 3 Complete:** ✅ All 3 tasks completed (100%)

**Current Progress:** Phase 4 in progress (1/2 completed, 1 deferred)

### Upcoming Phases

- **Phase 3:** Settings & Configuration (3/3) ✅ Complete
- **Phase 4:** State Persistence (1/2 completed, 1 deferred)
   - ✅ Timer State Persistence (Issue #15) - Completed
   - ⏸️ Session History Tracking (Issue #12) - Deferred until after front-end deployment
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
# bun (Recommended)
bun install

# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
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
