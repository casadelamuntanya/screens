export const sections = ['base', 'rescue', 'gear', 'wildlife'];

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
