<script setup lang="ts">
import OverlayLoader from '@/components/OverlayLoader.vue';
</script>

<template>
  <RouterView />
  <OverlayLoader></OverlayLoader>
  <PrimeConfirmDialog></PrimeConfirmDialog>
</template>

<style scoped></style>
