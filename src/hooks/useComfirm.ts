import AppDialog from '@/components/AppComfirmDialog.vue';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import { ref, h, createApp } from 'vue';
import type { ComponentInternalInstance } from 'vue';

export function useAppComfirm() {
  const isShow = ref<boolean>(false);

  function show(options: any) {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const instance = createApp({
      methods: {},
      render() {
        return h(AppDialog, {
          value: isShow.value,
          title: options.title,
          content: options.content,
          type: options.type,
          'update:value': (value: boolean) => {
            isShow.value = value;
          }
        });
      }
    });

    instance.use(PrimeVue, { ripple: true });
    instance.component('PrimeButton', Button);
    instance.component('PrimeDialog', Dialog);
    instance.mount(container);

    isShow.value = true;
  }

  return { show };
}
