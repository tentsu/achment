import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';

Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');


// Demo mode with demo data
window.DEMO = true;
