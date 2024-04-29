<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const { params, query } = useRoute();

const { path } = params;

router.replace({ path: '/' + path, query }).catch((error) => {
  console.warn(error);
});
</script>

<template></template>
