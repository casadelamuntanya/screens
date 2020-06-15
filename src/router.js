import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/navigation',
			name: 'navigation',
			component: Home,
			props: { activeNav: true },
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/About.vue'),
		},
		{
			path: '/ui',
			name: 'user-interface',
			component: () => import('./views/UserInterface.vue'),
		},
		{
			path: '*',
			name: 'not-found',
			component: () => import('./views/404.vue'),
		},
	],
});
