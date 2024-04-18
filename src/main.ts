import 'primevue/resources/themes/aura-light-green/theme.css';
import './assets/main.css';

import App from './App.vue';
import router from './router';
import setupAxiosConfig from '@/conf/axios-config';
import setupPiniaConfig from '@/conf/pinia-config';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

setupAxiosConfig(app);
setupPiniaConfig(app);

app.mount('#app');
