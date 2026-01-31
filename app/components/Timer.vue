<script setup lang="ts">
import { computed, toRef } from 'vue';

interface Props {
	duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
	duration: 1500,
});

const { formattedTime, status, start, pause, reset, timeRemaining } = useTimer(toRef(props, 'duration'));

const handleToggle = () => {
	if (status.value === 'running') {
		pause();
	} else {
		start();
	}
};

const canReset = computed(() => {
	return status.value !== 'idle' || timeRemaining.value !== props.duration;
});

const canStart = computed(() => {
	return status.value === 'idle' || status.value === 'paused' || status.value === 'completed';
});

const canPause = computed(() => {
	return status.value === 'running';
});
</script>

<template>
	<div class="timer">
		<p class="time">{{ formattedTime }}</p>
		<div class="timer-controls">
			<button
				class="pomo-button timer-control timer-control--reset"
				:disabled="!canReset"
				:aria-label="'Reset timer'"
				@click="reset()"
			>
				Reset
			</button>
			<button
				v-if="canStart"
				class="pomo-button timer-control timer-control--start"
				:aria-label="'Start timer'"
				@click="handleToggle"
			>
				Start
			</button>
			<button
				v-if="canPause"
				class="pomo-button timer-control timer-control--pause"
				:aria-label="'Pause timer'"
				@click="handleToggle"
			>
				Pause
			</button>
		</div>
	</div>
</template>