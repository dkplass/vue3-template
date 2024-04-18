import { IGNORE_GLOBAL_SPINNER_URLS } from '@/conf/app-config';
import router from '@/router';
import { useGlobalStore } from '@/stores/global';
import { size, join } from 'lodash-es';
import type { AxiosError, AxiosResponse } from 'axios';

function handleResponse(response: AxiosResponse) {
  const globalStore = useGlobalStore();

  const isIgnoreUrls = IGNORE_GLOBAL_SPINNER_URLS.some((url) => {
    return response.config.url === url;
  });

  if (!isIgnoreUrls) {
    globalStore.doDecrementAjaxReq();
  }

  if (response.data?.msg) {
    alert(response.data.msg);
  }

  return response;
}

function handleResponseError(error: AxiosError<any>) {
  const globalStore = useGlobalStore();

  const isIgnoreUrls = IGNORE_GLOBAL_SPINNER_URLS.some((url) => {
    return error.config?.url === url;
  });

  if (!isIgnoreUrls) {
    globalStore.doDecrementAjaxReq();
  }

  if (error.response?.status === 403) {
    router.push('/forbidden');
    return Promise.reject(error);
  }

  // special code
  // if() {
  //   alert()
  // }

  router.push('/error');
  return Promise.reject(error);
}

export { handleResponse, handleResponseError };
