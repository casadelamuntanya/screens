import Vue from 'vue';
import Vuei18n from 'vue-i18n';

Vue.use(Vuei18n);

const locales = require.context('./locales/', true, /index.js$/);
const messages = locales.keys().reduce((acc, key) => {
	const [, name] = key.split('/');
	return { ...acc, [name]: locales(key).default };
}, {});

export default new Vuei18n({
	locale: 'ca',
	fallbackLocale: 'ca',
	messages,
});
