<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

interface Props extends /* @vue-ignore */ NuxtLinkProps {
	variant?: string
}

const props = defineProps<Props>()
const { to } = props;
</script>

<template>
	<NuxtLink class="pomo-button" to={to}>
		<slot></slot>
	</NuxtLink>
</template>