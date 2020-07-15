export const sections = ['base', 'rescue', 'gear', 'wildlife', 'thunderstorm', 'hypothermia'];

export const principles = [
	{ id: 'plan', icon: 'ri-draft-line' },
	{ id: 'check', icon: 'ri-thunderstorms-line' },
	{ id: 'warn', icon: 'ri-feedback-line' },
	{ id: 'adapt', icon: 'ri-git-branch-line' },
	{ id: 'equipment', icon: 'ri-tools-fill' },
];


export const gear = {
	essentials: [
		'clothes',
		'shoes',
		'water',
		'food',
		'raincoat',
		'first_aid_kit',
		'mobile_phone',
		'maps_compass',
		'sun_protection',
		'thermal_blanket',
	],

	recommended: [
		'gps',
		'knive',
		'lighter',
		'headlamp',
		'sandals',
	],
};


export const hypothermia = {
	colors: ['#c23b22', '#BA4635', '#B15148', '#A95C5A', '#A1676D', '#987280', '#907D93', '#8888A5', '#7F93B8', '#779ECB'],
	symptoms: {
		normal: [36.6, 37],
		chill: [32.1, 36.5],
		sensory_loss: [28.5, 36.5],
		speech_impairment: [28.5, 35],
		memory_loss: [28.5, 34],
		motor_uncoordination: [28.5, 34],
		arrhythmia: [28.1, 29],
		cardiorespiratory_arrest: [28.1, 29],
		death: [28, 28],
	},

	prevention: {
		eat_n_drink: true,
		rest: true,
		protect_hands_head: true,
		adequate_clothes: true,
		no_cotton: false,
	},

	treatment: {
		call_emergency: true,
		isolate_cold: true,
		remove_wet: true,
		warm_up: true,
		warm_drinks: true,
		no_acolohol: false,
		no_heat: false,
	},
};


export const species = [
	{
		name: 'amanita_muscaria',
		image: {
			src: 'https://images.unsplash.com/photo-1585646181862-9605c3a248b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
			copyright: 'Photo by Henryk Piela from Unsplash',
		},
	},
	{
		name: 'vipera_aspis',
		image: {
			src: 'https://vignette.wikia.nocookie.net/reinoanimalia/images/d/d9/Vipera_aspis_aspis.jpg/revision/latest/scale-to-width-down/1000?cb=20150828090605&path-prefix=es',
			copyright: 'Photo by Felix Reimann from Wikimedia Commons',
		},
	},
	{
		name: 'ursus_arctos',
		image: {
			src: 'https://images.pexels.com/photos/35435/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			copyright: 'Photo by Rasmus Svinding from Pexels',
		},
	},
	{
		name: 'aconitum',
		image: [
			{
				name: 'aconitum_napellus',
				image: {
					src: 'http://www.vasteplantenshop.be/files/images/webshop/aconitum-napellus-1557148192_l.jpg',
					copyright: undefined,
				},
			},
			{
				name: 'aconitum_anthora',
				image: {
					src: 'https://www.asklepios-seeds.de/pub/media/catalog/product/cache/ecd051e9670bd57df35c8f0b122d8aea/a/c/aconitum_anthora002.jpg',
					copyright: undefined,
				},
			},
			{
				name: 'aconitum_vulparia',
				image: {
					src: 'https://live.staticflickr.com/8668/16365535008_141abfef52_k.jpg',
					copyright: 'Photo by Javier Pelayo from Flickr',
				},
			},
		],
	},
];


export const thunderstorm = {
	tips: {
		prevent: true,
		remove_metal: true,
		spread_group: true,
		good_shelter: true,
		safety_position: true,
		no_running: false,
		bad_shelter: false,
	},
};
