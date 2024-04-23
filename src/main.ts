import App from './App.vue';
import router from './router';
import setupAxiosConfig from '@/conf/axios-config';
import setupGlobalComponents from '@/conf/global-components';
import setupPiniaConfig from '@/conf/pinia-config';
// import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import '@/assets/main.scss';

const app = createApp(App);

setupAxiosConfig(app);
setupGlobalComponents(app);
setupPiniaConfig(app);

// app.use(VueKeyCloak, {
//   init: {
//     onLoad: 'login-required',
//     checkLoginIframe: false
//   },
//   config: {
//     url: import.meta.env.VITE_APP_KEYCLOAK_AUTH_URL,
//     clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
//     realm: import.meta.env.VITE_APP_KEYCLOAK_REALM
//   },
//   onReady: () => {
//     app.use(router);
//     app.use(PrimeVue);
//     app.mount('#app');
//   }
// });

app.use(router);
app.use(PrimeVue, { ripple: true });

app.mount('#app');
