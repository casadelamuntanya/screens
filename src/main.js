import Vue from 'vue';
import VueCommonFilters from 'vue-common-filters';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'reset-css';
import './styles/main.scss';
import 'remixicon/fonts/remixicon.css';

Vue.config.productionTip = false;
Vue.use(VueCommonFilters);

new Vue({
	router,
	i18n,
	render: h => h(App),
}).$mount('#app');
