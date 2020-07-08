import Vue from 'vue';
import VueAsyncComputed from 'vue-async-computed';
import VueCommonFilters from 'vue-common-filters';
import VueUnits from 'vue-units';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'reset-css';
import './styles/main.scss';
import 'remixicon/fonts/remixicon.css';
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;
Vue.use(VueAsyncComputed);
Vue.use(VueCommonFilters);
Vue.use(VueUnits);

new Vue({
	router,
	i18n,
	render: h => h(App),
}).$mount('#app');
