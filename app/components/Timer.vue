<script setup lang="ts">
const { formattedTime, status, start, pause, reset } = useTimer();

const handleToggle = () => {
	if (status.value === 'running') {
		pause();
	} else {
		start();
	}
};
</script>

<template>
	<div class="timer">
		<p class="time">{{ formattedTime }}</p>
		<div class="timer-controls">
			<button @click="reset()">Reset</button>
			<button @click="handleToggle">
				{{ status === 'running' ? 'Pause' : 'Start' }}
			</button>
		</div>
	</div>
</template>