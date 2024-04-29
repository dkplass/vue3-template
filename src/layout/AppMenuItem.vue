<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { isExternal } from '@/utils/validate';
import { ref, onBeforeMount, watch, computed } from 'vue';
import { useRoute, useRouter, type RouteRecordRaw, type RouteMeta } from 'vue-router';
import path from 'node:path';
import type { Ref, PropType } from 'vue';

//
const route = useRoute();

//
const router = useRouter();

//
const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout();

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentItemKey: {
    type: String as PropType<Nullable<string>>,
    default: null
  },
  basePath: {
    type: String,
    default: ''
  }
});

//
const isActiveMenu = ref<boolean>(false);

//
const itemKey = ref<Nullable<string>>(null);

//
const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true;
  }
  return false;
});

//
const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        return true;
      }
    });

    return showingChildren.length;
  }

  return 0;
});

//
const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }

  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child?.meta || !child?.meta?.hidden) {
        return child;
      }
    }
  }

  return { ...props.item, path: '' };
});

/** */
function itemClick(event: Event, item: RouteRecordRaw, index: number) {
  const meta: RouteMeta | undefined = item.meta;

  if (meta && meta.disabled) {
    event.preventDefault();
    return;
  }

  const { overlayMenuActive, staticMenuMobileActive } = layoutState;

  if (item.path && (staticMenuMobileActive.value || overlayMenuActive.value)) {
    onMenuToggle();
  }

  if (meta && meta.command) {
    meta.command({ originalEvent: event, item: item });
  }

  const foundItemKey = item.children
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey.value
    : itemKey.value;

  setActiveMenuItem(foundItemKey);
}

/** */
function checkActiveRoute(item: RouteRecordRaw) {
  return route.name === item.name;
}

/** */
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }

  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  return path.resolve(props.basePath, routePath);
}

//
watch(
  () => layoutConfig.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value =
      newVal === itemKey.value || (!!newVal && newVal?.startsWith(`${itemKey.value}-`));
  }
);

//
onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? `${props.parentItemKey}-${String(props.index)}`
    : String(props.index);

  const activeMenuItem: Ref<Nullable<string>> = layoutConfig.activeMenuItem;

  isActiveMenu.value =
    itemKey.value === activeMenuItem.value
      ? activeMenuItem.value.startsWith(`${itemKey.value}-`)
      : false;
});
</script>

<template>
  <li
    v-if="!props.item.meta || !props.item.meta.hidden"
    :class="{ 'layout-root-menuitem': props.root, 'active-menuitem': isActiveMenu }"
  >
    <div
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
      class="layout-menuitem-root-text"
    >
      <template v-if="theOnlyOneChild && theOnlyOneChild.meta">
        <!--  -->
        <a
          v-if="isExternal(props.item.path)"
          :href="resolvePath(theOnlyOneChild.path)"
          target="_blank"
          @click="itemClick($event, theOnlyOneChild, index)"
        >
          <i :class="theOnlyOneChild.meta.icon" class="layout-menuitem-icon"></i>
          <span class="layout-menuitem-text">{{ theOnlyOneChild.meta.title }}</span>
          <i
            v-if="theOnlyOneChild.children"
            class="pi pi-fw pi-angle-down layout-submenu-toggler"
          ></i>
        </a>

        <!--  -->
        <router-link
          v-else
          :to="resolvePath(theOnlyOneChild.path)"
          :class="{ 'active-route': checkActiveRoute(theOnlyOneChild) }"
          @click="itemClick($event, theOnlyOneChild, index)"
        >
          <i :class="theOnlyOneChild.meta.icon" class="layout-menuitem-icon"></i>
          <span class="layout-menuitem-text">{{ theOnlyOneChild.meta.title }}</span>
          <i
            v-if="theOnlyOneChild.children"
            class="pi pi-fw pi-angle-down layout-submenu-toggler"
          ></i>
        </router-link>
      </template>
    </div>

    <template v-else>
      <div class="layout-menuitem-root-text">
        <i v-if="props.item.meta" :class="props.item?.meta?.icon" class="layout-menuitem-icon"></i>
        <span class="layout-menuitem-text">{{ props.item?.meta?.title }}</span>
      </div>
      <Transition
        v-if="props.item.children && props.item.meta?.hidden !== true"
        name="layout-submenu"
      >
        <ul v-show="props.root ? true : isActiveMenu" class="layout-submenu">
          <app-menu-item
            v-for="(child, i) in props.item.children"
            :key="i"
            :index="i"
            :item="child"
            :parent-item-key="itemKey"
            :root="false"
            :base-path="resolvePath(child.path)"
          ></app-menu-item>
        </ul>
      </Transition>
    </template>
  </li>
</template>

<style lang="scss" scoped></style>
