<script setup lang="ts">
const { currentSessionType, duration, label, setSessionType, switchToNextSessionType, switchToLongBreak, SESSION_TYPES } = useSessionType();
const { progressText, increment, shouldTakeLongBreak, reset } = useSessionCounter(4);

const handleTimerComplete = () => {
	if (currentSessionType.value === SESSION_TYPES.POMODORO) {
		// Pomodoro completed - check if we should take long break BEFORE incrementing
		const willBeLongBreak = shouldTakeLongBreak.value;
		
		// Increment counter (will show 4/4 during long break)
		increment();
		
		// Determine break type based on session count
		// User will manually start the next session
		if (willBeLongBreak) {
			switchToLongBreak();
		} else {
			switchToNextSessionType();
		}
	} else {
		// Break completed
		if (currentSessionType.value === SESSION_TYPES.LONG_BREAK) {
			// Long break completed - reset counter to 0/4
			reset();
		}
		// Switch back to pomodoro
		// User will manually start the next session
		setSessionType(SESSION_TYPES.POMODORO);
	}
};
</script>

<template>
  <div class="home">
    <header id="home-header">
      <Logo variant="full" />
    </header>

    <main>
      <Timer :duration="duration" @complete="handleTimerComplete" />
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
      <FeatureProgress title="Sessions Completed" :progress-text="progressText" />
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