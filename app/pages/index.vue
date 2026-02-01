<script setup lang="ts">
import { ref, nextTick, type ComponentPublicInstance } from 'vue';

const { currentSessionType, duration, label, setSessionType, switchToNextSessionType, switchToLongBreak, SESSION_TYPES } = useSessionType();
const { progressText, increment, shouldTakeLongBreak } = useSessionCounter(4);

interface TimerInstance {
	reset: (newDuration?: number) => void;
	start: () => void;
	pause: () => void;
}

const timerRef = ref<ComponentPublicInstance & TimerInstance | null>(null);

const handleTimerComplete = async () => {
	if (currentSessionType.value === SESSION_TYPES.POMODORO) {
		// Pomodoro completed - check if we should take long break BEFORE incrementing
		// (because increment resets to 0 after 4, we need to check the state before)
		const willBeLongBreak = shouldTakeLongBreak.value;
		
		// Increment counter
		increment();
		
		// Determine break type based on session count
		if (willBeLongBreak) {
			switchToLongBreak();
		} else {
			switchToNextSessionType();
		}
	} else {
		// Break completed - switch back to pomodoro
		setSessionType(SESSION_TYPES.POMODORO);
	}
	
	// Wait for next tick to ensure duration has updated
	// The useTimer composable will automatically reset when duration changes (in COMPLETED state)
	// We just need to start the timer after the reset
	await nextTick();
	// Small delay to ensure watcher has processed duration change
	await new Promise(resolve => setTimeout(resolve, 100));
	if (timerRef.value) {
		// Start the timer (reset already happened via watcher)
		timerRef.value.start();
	}
};
</script>

<template>
  <div class="home">
    <header id="home-header">
      <Logo variant="full" />
    </header>

    <main>
      <Timer ref="timerRef" :duration="duration" @complete="handleTimerComplete" />
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