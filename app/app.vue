<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `PurePomodoro - ${titleChunk}` : 'PurePomodoro'
  },
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

