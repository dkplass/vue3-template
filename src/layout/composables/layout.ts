import { toRefs, reactive, computed } from 'vue';
import type { ToRefs, ComputedRef } from 'vue';

interface IUseLayout {
  layoutConfig: ToRefs<typeof layoutConfig>;
  layoutState: ToRefs<typeof layoutState>;
  setScale(scale: number): void;
  setActiveMenuItem(item: any): void;
  onMenuToggle(): void;
  isSidebarActive: ComputedRef;
  isDarkTheme: ComputedRef;
}

/** */
const layoutConfig = reactive<{
  ripple: boolean;
  darkTheme: boolean;
  inputStyle: string;
  menuMode: string;
  theme: string;
  scale: number;
  activeMenuItem: Nullable<string>;
}>({
  ripple: true,
  darkTheme: true,
  inputStyle: 'outlined',
  menuMode: 'static',
  theme: 'aura-light-green',
  scale: 14,
  activeMenuItem: null
});

/** */
const layoutState = reactive<{
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false
});

export function useLayout(): IUseLayout {
  /** */
  const setScale = (scale: number) => {
    layoutConfig.scale = scale;
  };

  // TODO: declare menu type, because item should be menu type
  /** */
  const setActiveMenuItem = (item: Nullable<string>) => {
    layoutConfig.activeMenuItem = item;
  };

  /** */
  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  /** */
  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  /** */
  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    setScale,
    setActiveMenuItem,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme
  };
}
