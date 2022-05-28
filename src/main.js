import './assets/css/main.css'
import './listeners'
import clickOut from './directives/clickOut'
import { createApp } from 'vue'
import App from './App.vue'

const rootApp = createApp(App);
rootApp.directive("clickout", clickOut);
rootApp.mount('#app');
