import './assets/main.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';

import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(createPinia()).use(router).use(PrimeVue, {theme: {preset: Aura}}).component('Toolbar', Toolbar).component('Avatar', Avatar).component('Button', Button).mount('#app');