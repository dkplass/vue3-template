<script setup lang="ts">
import laraThemeList from './composables/lara-theme-list';
import themeList from './composables/theme-list';
import { useLayout } from '@/layout/composables/layout';
import { usePrimeVue } from 'primevue/config';
import { ref, computed } from 'vue';
import type { IBasciConfig } from '@/interface/IBasciConfig';
import type { PrimeVueConfiguration } from 'primevue/config/PrimeVue';

const $primevue = usePrimeVue();
const { setScale, layoutConfig } = useLayout();

defineProps({
  simple: {
    type: Boolean,
    default: false
  }
});

//
const scales = ref<number[]>([12, 13, 14, 15, 16]);

//
const visible = ref<boolean>(false);

//
const inputStyles = ref<IBasciConfig[]>([
  { label: 'Outlined', value: 'outlined' },
  { label: 'Filled', value: 'filled' }
]);

//
const menuModes = ref<IBasciConfig[]>([
  { label: 'Static', value: 'static' },
  { label: 'Overlay', value: 'overlay' }
]);

//
const compactMaterial = ref<boolean>(false);

//
const primaryFocusRing = ref<boolean>(true);

//
const inputStyle = computed(() => {
  return $primevue.config.inputStyle || 'outlined';
});

/** */
function onConfigButtonClick() {
  visible.value = !visible.value;
}

/** */
function onChangeTheme(theme: string, isDarkTheme: boolean) {
  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme;
    layoutConfig.darkTheme.value = isDarkTheme;
  });
}

/** */
function decrementScale() {
  setScale(layoutConfig.scale.value - 1);
  applyScale();
}

/** */
function incrementScale() {
  setScale(layoutConfig.scale.value + 1);
  applyScale();
}

/** */
function applyScale() {
  document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
}

/** */
function onInputStyleChange(value: PrimeVueConfiguration['inputStyle']) {
  $primevue.config.inputStyle = value;
}

/** */
function onMenuModeChange(value: string) {
  layoutConfig.menuMode.value = value;
}

/** */
function onRippleChange(value: boolean) {
  layoutConfig.ripple.value = value;
}

/** */
function onDarkModeChange(value: boolean) {
  const newThemeName = value
    ? layoutConfig.theme.value.replace('light', 'dark')
    : layoutConfig.theme.value.replace('dark', 'light');

  layoutConfig.darkTheme.value = value;
  onChangeTheme(newThemeName, value);
}

/** */
function changeTheme(theme: string, color: string) {
  let newTheme: string = '';
  let dark: boolean = false;

  newTheme = `${theme}-${layoutConfig.darkTheme.value ? 'dark' : 'light'}`;

  if (color) {
    newTheme += `-${color}`;
  }

  if (newTheme.startsWith('md-') && compactMaterial.value) {
    newTheme = newTheme.replace('md-', 'mdc-');
  }

  dark = layoutConfig.darkTheme.value;

  onChangeTheme(newTheme, dark);
}

/** */
function isThemeActive(themeFamily: string, color: string) {
  let themeName: string = '';
  let themePrefix: string = themeFamily === 'md' && compactMaterial.value ? 'mdc' : themeFamily;

  themeName = themePrefix + (layoutConfig.darkTheme.value ? '-dark' : '-light');

  if (color) {
    themeName += `-${color}`;
  }

  return layoutConfig.theme.value === themeName;
}

/** */
function onCompactMaterialChange(value: boolean) {
  compactMaterial.value = value;

  if (layoutConfig.theme.value.startsWith('md')) {
    let tokens = layoutConfig.theme.value.split('-');
    changeTheme(tokens[0].substring(0, 2), tokens[2]);
  }
}

/** */
function onFocusRingColorChange(value: boolean) {
  primaryFocusRing.value = value;
  let root: HTMLElement = document.documentElement;

  if (value) {
    if (layoutConfig.darkTheme.value)
      root.style.setProperty('--p-focus-ring-color', 'var(--primary-500)');
    else root.style.setProperty('--p-focus-ring-color', 'var(--primary-500)');
  } else {
    if (layoutConfig.darkTheme.value)
      root.style.setProperty('--p-focus-ring-color', 'var(--surface-500)');
    else root.style.setProperty('--p-focus-ring-color', 'var(--surface-900)');
  }
}
</script>

<template>
  <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick">
    <i class="pi pi-cog"></i>
  </button>

  <PrimeSidebar
    v-model:visible="visible"
    :position="'right'"
    class="layout-config-sidebar w-26rem"
    pt:close-button="ml-auto"
  >
    <div class="p-2">
      <!-- scale section -->
      <section
        class="pb-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
      >
        <span class="text-xl font-semibold">Scale</span>
        <div
          class="flex align-items-center gap-2 border-1 surface-border py-1 px-2"
          style="border-radius: 30px"
        >
          <PrimeButton
            icon="pi pi-minus"
            text
            rounded
            :disabled="layoutConfig.scale.value === scales[0]"
            @click="decrementScale"
          />
          <i
            v-for="s in scales"
            :key="s"
            :class="[
              'pi pi-circle-fill text-sm text-200',
              { 'text-lg text-primary': s === layoutConfig.scale.value }
            ]"
          />
          <PrimeButton
            icon="pi pi-plus"
            text
            rounded
            :disabled="layoutConfig.scale.value === scales[scales.length - 1]"
            @click="incrementScale"
          />
        </div>
      </section>

      <!-- mode change -->
      <section
        class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
      >
        <span :class="['text-xl font-semibold']">Dark mode</span>
        <PrimeInputSwitch
          :model-value="layoutConfig.darkTheme.value"
          @update:model-value="onDarkModeChange"
        ></PrimeInputSwitch>
      </section>

      <!-- Menu Type -->
      <template v-if="!simple">
        <section
          class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
        >
          <span class="text-xl font-semibold">Menu Type</span>
          <PrimeSelectButton
            :model-value="layoutConfig.menuMode.value"
            :options="menuModes"
            option-label="label"
            option-value="value"
            :allow-empty="false"
            @update:model-value="onMenuModeChange"
          />
        </section>
      </template>

      <!-- Input Style -->
      <section
        class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
      >
        <span class="text-xl font-semibold">Input Variant</span>
        <PrimeSelectButton
          :model-value="inputStyle"
          :options="inputStyles"
          option-label="label"
          option-value="value"
          :allow-empty="false"
          @update:model-value="onInputStyleChange"
        />
      </section>

      <!-- Ripple Effect -->
      <section
        class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
      >
        <span class="text-xl font-semibold">Ripple Effect</span>
        <PrimeInputSwitch
          :model-value="layoutConfig.ripple.value"
          @update:model-value="onRippleChange"
        />
      </section>

      <!-- theme color picker -->
      <section class="py-4 border-bottom-1 surface-border">
        <div class="text-xl font-semibold mb-3">Themes</div>
        <div class="flex align-items-center gap-2 mb-3">
          <img
            src="https://primefaces.org/cdn/primevue/images/themes/aura.png"
            alt="Aura"
            style="width: 1.5rem"
          />
          <span class="font-medium">Aura</span>
        </div>
        <div class="grid grid-nogutter mb-3">
          <template v-for="(theme, index) in themeList" :key="index">
            <div class="col-3 p-1">
              <PrimeButton
                :class="[
                  'bg-transparent border-1 cursor-pointer p-2 w-full flex align-items-center justify-content-center transition-all transition-duration-200',
                  {
                    'border-primary': isThemeActive(theme.theme, theme.color),
                    'hover:border-500 surface-border': !isThemeActive(theme.theme, theme.color)
                  }
                ]"
                style="border-radius: 30px"
                @click="changeTheme(theme.theme, theme.color)"
              >
                <span
                  class="block h-1rem w-full"
                  style="border-radius: 30px"
                  :style="{ background: theme.spanBackground }"
                ></span>
              </PrimeButton>
            </div>
          </template>
        </div>
      </section>

      <!-- Focus Ring -->
      <section class="pt-4 flex align-items-center justify-content-between">
        <span class="text-sm">Primary Focus Ring</span>
        <PrimeInputSwitch
          :model-value="primaryFocusRing"
          @update:model-value="onFocusRingColorChange"
        />
      </section>

      <!-- Lara theme -->
      <section class="py-4 border-bottom-1 surface-border">
        <div class="flex align-items-center gap-2 mb-3">
          <img
            src="https://primefaces.org/cdn/primevue/images/themes/lara-light-teal.png"
            alt="Lara Light Teal"
            class="border-circle"
            style="width: 1.5rem"
          />
          <span class="font-medium">Lara</span>
        </div>
        <div class="grid grid-nogutter mb-3">
          <template v-for="(theme, index) in laraThemeList" :key="index">
            <div class="col-3 p-1">
              <PrimeButton
                :class="[
                  'bg-transparent border-1 cursor-pointer p-2 w-full flex align-items-center justify-content-center transition-all transition-duration-200',
                  {
                    'border-primary': isThemeActive(theme.theme, theme.color),
                    'hover:border-500 surface-border': !isThemeActive(theme.theme, theme.color)
                  }
                ]"
              >
                <span
                  class="block h-1rem w-full"
                  style="border-radius: 30px"
                  :style="{ background: theme.spanBackground }"
                ></span>
              </PrimeButton>
            </div>
          </template>
        </div>
      </section>

      <!--  -->
      <section class="py-4 border-bottom-1 surface-border">
        <div class="flex align-items-center gap-2 mb-3">
          <img
            src="https://primefaces.org/cdn/primevue/images/themes/md-light-indigo.svg"
            alt="Material Design"
            class="border-circle"
            style="width: 1.5rem"
          />
          <span class="font-medium">Material Design</span>
          <div class="ml-auto flex align-items-center gap-2">
            <label for="material-condensed" class="text-sm">Condensed</label>
            <PrimeInputSwitch
              input-id="material-condensed"
              :model-value="compactMaterial"
              class="ml-auto"
              @update:model-value="onCompactMaterialChange"
            />
          </div>
        </div>
        <div class="flex align-items-center justify-content-between gap-3">
          <PrimeButton
            :class="[
              'bg-transparent border-1 cursor-pointer p-2 w-3 flex align-items-center justify-content-center transition-all transition-duration-200',
              {
                'border-primary': isThemeActive('md', 'indigo'),
                'hover:border-500 surface-border': !isThemeActive('md', 'indigo')
              }
            ]"
            style="border-radius: 30px"
            @click="changeTheme('md', 'indigo')"
          >
            <span
              class="block h-1rem w-full"
              style="
                border-radius: 30px;
                background: linear-gradient(180deg, #0565f2 0%, rgba(5, 101, 242, 0.5) 100%);
              "
            ></span>
          </PrimeButton>
          <PrimeButton
            :class="[
              'bg-transparent border-1 cursor-pointer p-2 w-3 flex align-items-center justify-content-center transition-all transition-duration-200',
              {
                'border-primary': isThemeActive('md', 'deeppurple'),
                'hover:border-500 surface-border': !isThemeActive('md', 'deeppurple')
              }
            ]"
            style="border-radius: 30px"
            @click="changeTheme('md', 'deeppurple')"
          >
            <span
              class="block h-1rem w-full"
              style="
                border-radius: 30px;
                background: linear-gradient(180deg, #702f92 0%, rgba(112, 47, 146, 0.5) 100%);
              "
            ></span>
          </PrimeButton>
          <div class="w-3"></div>
          <div class="w-3"></div>
        </div>
      </section>
    </div>
  </PrimeSidebar>
</template>

<style lang="scss" scoped></style>
