import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');


// Demo mode with demo data to demo app like a demon
window.DEMO = true;
