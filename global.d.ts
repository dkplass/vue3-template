import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare global {
  interface WindowEventMap {
    Click: CustomEvent;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
