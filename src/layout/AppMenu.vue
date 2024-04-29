<script setup lang="ts">
import AppMenuItem from './AppMenuItem.vue';
import { usePermissionStore } from '@/stores/permission';
import { computed } from 'vue';

const permissionStore = usePermissionStore();

const routes = computed(() => {
  return permissionStore.routes;
});
</script>

<template>
  <ul class="layout-menu">
    <template v-for="route in routes" :key="route">
      <app-menu-item :item="route" :base-path="route.path"></app-menu-item>
      <li class="menu-separator"></li>
    </template>
    <!-- <li>
      <a href="javascript:void(0)" target="_blank">
        <img src="#" alt="Advertising" class="w-full mt-3" />
      </a>
    </li> -->
  </ul>
</template>

<style lang="scss" scoped></style>
