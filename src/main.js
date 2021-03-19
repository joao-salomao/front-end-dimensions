import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Multiselect from 'vue-multiselect'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
Vue.component('multiselect', Multiselect);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
