<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentRoute = computed(() => {
  return router.currentRoute;
});
</script>

<template>{{ currentRoute }}</template>

<style lang="scss" scoped></style>
