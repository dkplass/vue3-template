import { permission } from '@/directives/permission';
import type { App } from 'vue';

export default (app: App) => {
  app.directive('permission', permission);
};
