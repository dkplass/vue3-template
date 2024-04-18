import 'primevue/resources/themes/aura-light-green/theme.css';
import './assets/main.css';

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.mount('#app');
