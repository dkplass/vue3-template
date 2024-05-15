<script setup lang="ts">
import SwitchRoles from './components/SwitchRoles.vue';
import { checkPermission } from '@/utils/permission';
import { ref } from 'vue';

const key = ref<number>(1);

function changeRoleHandler() {
  key.value++;
}
</script>

<template>
  <div class="card">
    <div class="flex flex-wrap gap-3">
      <SwitchRoles @change="changeRoleHandler"></SwitchRoles>
    </div>
  </div>

  <div class="card">
    <div class="flex mt-6">
      <div :key="key">
        <span v-permission="['admin']">
          Only
          <PrimeTag :value="`admin`"></PrimeTag>
          can see this
        </span>
        <PrimeTag v-permission="['admin']" :value="`admin`" severity="info">
          v-permission="['admin']"
        </PrimeTag>
      </div>
    </div>

    <div class="flex mt-6">
      <div :key="key">
        <span v-permission="['editor']">
          Only
          <PrimeTag :value="`editor`"></PrimeTag>
          can see this
        </span>
        <PrimeTag v-permission="['editor']" :value="`admin`" severity="info">
          v-permission="['editor']"
        </PrimeTag>
      </div>
    </div>

    <div class="flex mt-6">
      <div :key="key">
        <span v-permission="['admin', 'editor']">
          Both
          <PrimeTag :value="`admin and editor`"></PrimeTag>
          can see this
        </span>
        <PrimeTag v-permission="['admin', 'editor']" :value="`admin, editor`" severity="info">
          v-permission="['admin', 'editor']"
        </PrimeTag>
      </div>
    </div>
  </div>

  <div :key="`checkPermission${key}`" class="card">
    <PrimeTabView>
      <PrimeTabPanel v-if="checkPermission(['admin'])" header="Admin">
        Admin can see this
        <PrimeTag severity="info"> v-if="checkPermission(['admin'])" </PrimeTag>
      </PrimeTabPanel>
      <PrimeTabPanel v-if="checkPermission(['editor'])" header="Editor">
        Editor can see this
        <PrimeTag severity="info"> v-if="checkPermission(['editor'])" </PrimeTag>
      </PrimeTabPanel>
      <PrimeTabPanel v-if="checkPermission(['admin', 'editor'])" header="Admin-OR-Editor">
        Both admin or editor can see this
        <PrimeTag severity="info"> v-if="checkPermission(['admin','editor'])" </PrimeTag>
      </PrimeTabPanel>
    </PrimeTabView>
  </div>
</template>

<style lang="scss" scoped></style>
