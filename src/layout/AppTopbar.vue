<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

//
const { layoutConfig, onMenuToggle } = useLayout();

//
const router = useRouter();

//
const outsideClickListener = ref<EventListener | null>(null);

//
const topbarMenuActive = ref<boolean>(false);

//
const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

//
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

/**
 *
 */
function onTopbarMenuButton() {
  topbarMenuActive.value = !topbarMenuActive.value;
}

/**
 *
 */
function onSettingsClick() {
  topbarMenuActive.value = false;
  router.push('/documentation');
}

/**
 *
 */
function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = ((event: MouseEvent) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    }) as EventListener;

    document.addEventListener('click', outsideClickListener.value);
  }
}

/**
 *
 */
function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

/**
 *
 */
function isOutsideClicked(event: Event) {
  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(
    sidebarEl?.isSameNode(event.target as HTMLElement) ||
    sidebarEl?.contains(event.target as HTMLElement) ||
    topbarEl?.isSameNode(event.target as HTMLElement) ||
    topbarEl?.contains(event.target as HTMLElement)
  );
}

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>VITE</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopbarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button class="p-link layout-topbar-button" @click="onTopbarMenuButton()">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>
      <button class="p-link layout-topbar-button" @click="onTopbarMenuButton()">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button class="p-link layout-topbar-button" @click="onSettingsClick()">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
