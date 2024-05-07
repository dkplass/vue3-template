<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import { ref, watch } from 'vue';

const globalStore = useGlobalStore();

const isShowSpinner = ref<boolean>(false);
// interface Props {}
// const props = withDefaults(defineProps<Props>(), {});
watch(
  () => globalStore.isShowSpinner,
  (newVal) => {
    isShowSpinner.value = newVal;
  },
  { immediate: true }
);
</script>

<template>
  <div v-show="isShowSpinner" class="progress-spinner-overlay">
    <slot name="overlay-content">
      <PrimeProgressSpinner
        style="width: 50px; height: 50px"
        stroke-width="8"
        animation-duration="1s"
        aria-label="Custom ProgressSpinner"
      ></PrimeProgressSpinner>
    </slot>
  </div>
</template>

<style scoped>
.progress-spinner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

:deep(.p-progress-spinner) {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

:deep(.p-progress-spinner-circle) {
  stroke: var(--primary-700) !important;
}
</style>
