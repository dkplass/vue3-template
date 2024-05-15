<script setup lang="ts">
import { RolesType } from '@/interface/IUserProfile';
import { useUserProfileStore } from '@/stores/userProfile';
import { computed } from 'vue';

const emits = defineEmits(['change']);

const userProfileStore = useUserProfileStore();

const roleTypes = ['admin', 'editor'];

//
const roles = computed(() => {
  return userProfileStore.userProfile.roles;
});

//
const switchRole = computed({
  get() {
    return roles.value[0];
  },
  set(value: keyof typeof RolesType) {
    userProfileStore.doChangeRole(value).then(() => {
      emits('change');
    });
  }
});
</script>

<template>
  <div v-for="role in roleTypes" :key="role" class="flex align-items-center">
    <PrimeRadioButton
      v-model="switchRole"
      :input-id="role"
      name="roleTypes"
      :value="role"
    ></PrimeRadioButton>
    <label :for="role" class="ml-2">{{ role }}</label>
  </div>
</template>

<style lang="scss" scoped></style>
