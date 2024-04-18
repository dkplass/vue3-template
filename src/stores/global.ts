import moment from 'moment';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    axios: {
      requestCount: 0,
      sessionExpiredTime: import.meta.env.VITE_SESSION_EXPIRATION
    }
  }),
  getters: {
    isShowSpinner: (state) => {
      return state.axios.requestCount > 0;
    }
  },
  actions: {
    doIncrementAjaxReq() {
      this.axios.requestCount++;
    },
    doDecrementAjaxReq() {
      this.axios.requestCount--;
    },
    doResetSessionExpiredTime() {
      this.axios.sessionExpiredTime = moment().add(
        import.meta.env.VITE_SESSION_EXPIRATION,
        'minutes'
      );
    }
  }
});
