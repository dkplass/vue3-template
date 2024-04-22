import { IGNORE_GLOBAL_SPINNER_URLS } from '@/conf/app-config';
import { useGlobalStore } from '@/stores/global';
import { delay } from 'lodash-es';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { App } from 'vue';

function handleRequest(config: InternalAxiosRequestConfig, app: App) {
  const globalStore = useGlobalStore();
  // const { $keycloak } = app.config.globalProperties;

  const isIgnoreUrls = IGNORE_GLOBAL_SPINNER_URLS.some((url) => {
    return config.url === url;
  });

  if (!isIgnoreUrls) {
    delay(() => globalStore.doIncrementAjaxReq(), 500);
  }

  // ADD API TOKEN
  // if ($keycloak) {
  //   config.headers!.Authorization = `Bearer ${$keycloak.token}`;
  // }

  globalStore.doResetSessionExpiredTime();

  return config;
}

function handleRequestError(error: AxiosError) {
  return Promise.reject(error);
}

export { handleRequest, handleRequestError };
