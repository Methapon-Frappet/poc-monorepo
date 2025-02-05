import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Dialog, Loading, Quasar } from 'quasar';

import iconSet from 'quasar/icon-set/mdi-v7';
import '@quasar/extras/mdi-v7/mdi-v7.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(Quasar, {
  iconSet,
  plugins: {
    Dialog,
    Loading,
  },
});
app.use(router);

app.mount('#app');
