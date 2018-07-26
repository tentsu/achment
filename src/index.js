import Vue from 'vue';
import App from './App';


// Demo mode with demo data to demo app like a demon
window.DEMO = true;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');

