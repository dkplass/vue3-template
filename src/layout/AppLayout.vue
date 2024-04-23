<script setup lang="ts">
import AppConfig from './AppConfig.vue';
import AppTopbar from './AppTopbar.vue';
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, watch } from 'vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<EventListener | null>(null);

const containerClass = computed(() => {
  return {
    'layout-theme-light': !layoutConfig.darkTheme.value,
    'layout-theme-dark': layoutConfig.darkTheme.value,
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-static-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-ripple-disabled': layoutConfig.ripple.value
  };
});

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = ((event: MouseEvent) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    }) as EventListener;

    document.addEventListener('click', outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event: Event) {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(
    sidebarEl?.isSameNode(event.target as HTMLElement) ||
    sidebarEl?.contains(event.target as HTMLElement) ||
    topbarEl?.isSameNode(event.target as HTMLElement) ||
    topbarEl?.contains(event.target as HTMLElement)
  );
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <app-config></app-config>
  </div>
  <!-- <Toast /> -->
</template>

<style lang="scss" scoped></style>
