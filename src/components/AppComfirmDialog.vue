<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue';

const emits = defineEmits(['update:value']);

interface Props {
  // 開啟彈窗
  value: boolean;
  // 標題
  title: string;
  // 內文
  content: string;
  // 提示類別
  type: 'Error' | 'Warning' | 'Success' | '';
  //
  confirm?: () => void;
  //
  cancel?: () => void;
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<Props['type']>,
    default: ''
  }
});

const iconType = computed(() => {
  let cssStr = '';

  switch (props.type) {
    case 'Error':
      cssStr = 'pi-times text-red-500';
      break;
    case 'Warning':
      cssStr = 'pi-exclamation-triangle text-yellow-500';
      break;
    case 'Success':
      cssStr = 'pi-check text-green-500';
      break;
    default:
      cssStr = '';
  }

  return cssStr;
});

const visible = ref<boolean>(false);

function confirmHandler() {
  visible.value = false;

  emits('update:value', visible.value);
}

function cancelHandler() {
  visible.value = false;

  emits('update:value', visible.value);
}

watch(
  () => {
    return props.value;
  },
  (newVal) => {
    console.log(newVal);
    visible.value = newVal;
  },
  { immediate: true }
);
</script>

<template>
  <PrimeDialog
    v-bind="{
      closable: false
    }"
    :visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <template #header>{{ props.title }}</template>
    <div class="flex align-items-center justify-content-center w-full">
      <i v-if="iconType" class="pi text-xl" :class="iconType"></i>
    </div>
    <span class="p-text-secondary block">{{ $props.content }}</span>
    <template #footer>
      <PrimeButton label="OK" outlined severity="secondary" autofocus @click="confirmHandler" />
      <PrimeButton label="CANCEL" outlined severity="secondary" autofocus @click="cancelHandler" />
    </template>
  </PrimeDialog>
</template>

<style scoped></style>
