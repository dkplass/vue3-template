<script setup lang="ts">
import { ref, watch, onMounted, type PropType, type ComputedRef } from 'vue';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: ''
  },
  forTarget: {
    type: String,
    default: ''
  },
  labelText: {
    type: String,
    default: ''
  },
  inputClass: {
    type: Object,
    default: () => {
      return {};
    }
  },
  errorMsg: {
    type: String,
    default: ''
  }
  // errors: {
  //   type: Object as PropType<ComputedRef<Partial<Record<string, string | undefined>>>>
  // }
});

const localValue = ref<any>();

watch(
  () => {
    return props.modelValue;
  },
  (newVal) => {
    localValue.value = newVal;
  },
  { immediate: true }
);

function updateHandler(value: string) {
  emits('update:modelValue', value);
}
</script>

<template>
  <div class="field">
    <label :for="props.forTarget">{{ props.labelText }}</label>
    <PrimeInputText
      :model-value="modelValue"
      aria-describedby="fullName-help"
      :class="props.inputClass"
      @update:model-value="updateHandler"
    ></PrimeInputText>
    <small id="fullName-help" class="p-error">
      <slot name="error">
        {{ errorMsg }}
      </slot>
    </small>
  </div>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 4px;
}

.p-error {
  display: block;
}
</style>
