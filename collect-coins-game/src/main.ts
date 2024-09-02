import './assets/main.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'


import { createApp } from 'vue';
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';
import Select from 'primevue/select';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToggleSwitch from 'primevue/toggleswitch';
import Card from 'primevue/card';

import App from './App.vue'
import router from './router'

const app = createApp(App);
app
.use(createPinia())
.use(router)
.use(PrimeVue, {theme: {preset: Aura}})
.component('Toolbar', Toolbar)
.component('Select', Select)
.component('Avatar', Avatar)
.component('Button', Button)
.component('Message', Message)
.component('DataTable', DataTable)
.component('Column', Column)
.component('ToggleSwitch', ToggleSwitch)
.component('Card', Card)
.mount('#app');