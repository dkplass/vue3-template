<script setup lang="ts">
import SwitchRoles from './components/SwitchRoles.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function changeRoleHandler() {
  router.push({ path: `/permission/index?${+new Date()}` }).catch((err) => {
    console.warn(err);
  });
}
</script>

<template>
  <div class="card flex justify-content-left">
    <div class="flex flex-wrap gap-3">
      <SwitchRoles @change="changeRoleHandler"></SwitchRoles>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
