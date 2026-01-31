<script setup lang="ts">
const { currentSessionType, duration, label, setSessionType, SESSION_TYPES } = useSessionType();
</script>

<template>
  <div class="home">
    <header id="home-header">
      <Logo variant="full" />
    </header>

    <main>
      <Timer :duration="duration" />
      <div class="session-type-controls">
        <p class="session-type">{{ label }}</p>
        <div class="session-type-buttons">
          <button
            class="pomo-button session-type-button"
            :class="{ 'session-type-button--active': currentSessionType === SESSION_TYPES.POMODORO }"
            :aria-label="'Switch to Pomodoro session'"
            @click="setSessionType(SESSION_TYPES.POMODORO)"
          >
            Work
          </button>
          <button
            class="pomo-button session-type-button"
            :class="{ 'session-type-button--active': currentSessionType === SESSION_TYPES.SHORT_BREAK }"
            :aria-label="'Switch to Short Break session'"
            @click="setSessionType(SESSION_TYPES.SHORT_BREAK)"
          >
            Short Break
          </button>
          <button
            class="pomo-button session-type-button"
            :class="{ 'session-type-button--active': currentSessionType === SESSION_TYPES.LONG_BREAK }"
            :aria-label="'Switch to Long Break session'"
            @click="setSessionType(SESSION_TYPES.LONG_BREAK)"
          >
            Long Break
          </button>
        </div>
      </div>
      <FeatureProgress title="Sessions Completed" progress-text="0/4" />
    </main>

    <footer id="home-footer">
      <ul>
        <li>
          <PomoLink to="/settings">Settings</PomoLink>
        </li>
        <li>
          <PomoLink to="mailto:support@quicksnapmedia.com">Feedback</PomoLink>
        </li>
      </ul>
    </footer>
  </div>
</template>