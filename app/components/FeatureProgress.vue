<script setup lang="ts">
interface Props {
	title: string
	progressText: string
}

const { title, progressText } = defineProps<Props>();
</script>
<template>
	<div>
		<div class="feature-title">
			{{ title }}
		</div>
		<p class="feature-text">
			{{ progressText }}
		</p>
	</div>
</template>