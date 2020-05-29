import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
