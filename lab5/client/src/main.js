import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/bootstrap'

Vue.config.productionTip = false;

new Vue({
    router,
    // template: '<App/>',
    // components: App,
    render: h => h(App),
}).$mount('#app');
