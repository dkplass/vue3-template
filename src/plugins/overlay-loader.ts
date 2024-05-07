import OverlayLoader from '@/components/OverlayLoader.vue';
import { type ComponentInternalInstance, type App, h, render } from 'vue';

function createComponent(component: any, props: any, rootContainer: Element) {
  const vnode = h(component, props);
  const container = document.createElement('div');
  rootContainer.appendChild(container);
  render(vnode, container);
  return vnode.component;
}

function removeComponent(el: Element) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else {
    el.parentNode?.removeChild(el);
  }
}

export function useOverlayLoader(globalProps: any, globalSlots: any) {
  let instance: ComponentInternalInstance | any = null;

  return {
    show(props: any = globalProps, slot: any = globalSlots): void {
      const propsData = Object.assign({}, globalProps, props);

      let container = propsData.container;
      if (!propsData.container) {
        container = document.body;
      }

      instance = createComponent(OverlayLoader, propsData, container);

      const mergedSlots = Object.assign({}, globalSlots, slot);

      Object.keys(mergedSlots).map((name) => {
        if (instance != null) {
          instance.slots[name] = mergedSlots[name];
        }
      });
    },
    hide() {
      if (instance != null) {
        instance.ctx.hide();
        const root = instance.vnode.el;
        removeComponent(root.parentElement);
      }
    }
  };
}

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$overlay = () => {
      return {
        // show: useOverlayLoader.show()
        // hide: useOverlayLoader({}, {}).hide()
      };
    };
  }
};
