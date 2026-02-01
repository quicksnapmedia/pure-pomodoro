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
		// Pomodoro completed - increment counter and switch to break
		increment();
		
		// Determine break type based on session count
		if (shouldTakeLongBreak.value) {
			switchToLongBreak();
		} else {
			switchToNextSessionType();
		}
	} else {
		// Break completed - switch back to pomodoro
		setSessionType(SESSION_TYPES.POMODORO);
	}
	
	// Wait for next tick to ensure duration has updated, then reset and start timer
	await nextTick();
	if (timerRef.value) {
		// Reset with new duration to ensure it's set correctly, then start
		timerRef.value.reset(duration.value);
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