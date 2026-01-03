<script setup lang="ts">
interface Props {
	title: string
	progressText: string
}

const { title, progressText } = defineProps<Props>();
</script>
<template>
	<div class="feature-progress">
		<div class="feature-title">
			{{ title }}
		</div>
		<p class="feature-progress-text">
			{{ progressText }}
		</p>
	</div>
</template>