import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
import '@types/node';

declare global {
  interface WindowEventMap {
    Click: CustomEvent;
  }

  type Nullable<T> = T | null | undefined;

  type GenericObject<T> = { [key: string]: T };
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    env?: string;
    auth?: boolean;
    label?: string;
    icon?: string;
    hidden?: boolean;
    disabled?: boolean;
    command?(args: any): void;
  }
}
