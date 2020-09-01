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
			props: { activeNavigation: true },
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/About.vue'),
		},
		{
			path: '/explore',
			name: 'explore',
			component: () => import('./views/Explore.vue'),
		},
		{
			path: '/safety',
			name: 'safety',
			component: () => import('./views/Safety.vue'),
			children: [
				{
					path: '',
					name: 'base',
					component: () => import('./views/safety/SafetyBase.vue'),
				},
				{
					path: 'gear',
					name: 'gear',
					component: () => import('./views/safety/SafetyGear.vue'),
				},
				{
					path: 'rescue',
					name: 'rescue',
					component: () => import('./views/safety/SafetyRescue.vue'),
				},
				{
					path: 'wildlife',
					name: 'wildlife',
					component: () => import('./views/safety/SafetyWildlife.vue'),
				},
				{
					path: 'hypothermia',
					name: 'hypothermia',
					component: () => import('./views/safety/SafetyHypothermia.vue'),
				},
				{
					path: 'thunderstorm',
					name: 'thunderstorm',
					component: () => import('./views/safety/SafetyThunderstorm.vue'),
				},
			],
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
