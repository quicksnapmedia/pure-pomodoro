<script setup lang="ts">
const variants = {
	compact: '',
	full: ''
};


interface Props {
	variant?: keyof (typeof variants);
}

const { variant } = defineProps<Props>();

</script>

<template>
	<div v-if="variant === 'full'" class="logo" v-bind:class="variant">
		<span class="logo-placeholder"></span>
	    <span class="placeholder-title">PurePomodoro</span>
	</div>

	<div v-else class="logo">
		<span class="logo-placeholder"></span>
	</div>
</template>
