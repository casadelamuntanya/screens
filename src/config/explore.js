/* Airtable query options */
export const query = {
	base: 'appMWr6cRQN40oIM2',
	table: '/trails',
	fields: ['name', 'duration', 'distance', 'drop_positive', 'drop_negative', 'seasonality', 'do_it_now', 'profile', 'img', 'track', 'milestones', 'wildlife', 'flora', 'culture'],
	localeFields: ['name'],
};

export const filters = {
	profiles: ['CASUAL', 'TREKKER', 'FAMILY', 'IGER', 'RUNNER'],
	ranges: [
		{ attr: 'distance', limits: [0, 30000], step: 1000, unit: { from: 'm', to: 'km' } },
		{ attr: 'duration', limits: [0, 36000], step: 3600, unit: { from: 's', to: 'h' } },
		{ attr: 'drop_positive', limits: [0, 2000], step: 100, unit: { from: 'm', to: 'm' } },
	],
	pickers: [
		{ attr: 'culture', options: ['ROMANESQUE', 'DRY_STONE', 'ART'] },
		{
			attr: 'wildlife',
			options: ['RUPICABRA', 'CAPREOLUS', 'OVIS_MUSIMON', 'MARMOTA', 'LUTRINAE', 'SALMO_TRUTTA', 'TRITURUS', 'LACERTA', 'TETRAO', 'LAGOPUS', 'ATHENE_NOCTUA'],
		},
		{ attr: 'flora', options: ['NARCISSUS_POETICUS', 'SINGULAR_TREE'] },
	],
};

/* Leaflet map options */
export const map = {
	center: [42.556564, 1.533476], // Casa de la Muntanya
	zoom: 17,
	maxZoom: 18,
	minZoom: 11,
	maxBounds: [[42.254118, 1.261305], [42.754004, 1.902439]],
	tiles: [
		{
			name: 'Satellite',
			url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
			options: {
				attribution: '&copy; Mapbox',
				accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
			},
		},
	],
	controls: {
		zoom: { position: 'topleft' },
		scale: { position: 'bottomleft', imperial: false },
		// layers: { position: 'topright' },
		attribution: { position: 'bottomright', prefix: '&copy; Leaflet' },
		compare: {
			orientation: 'vertical',
			thumbPosition: '0%',
			name: 'Topographic',
			url: 'https://api.mapbox.com/styles/v1/markusand/ck4tte5dt1x7n1cod1yrxr0r1/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
			options: {
				attribution: '&copy; Marc Vilella',
				accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
			},
		},
		elevation: {
			position: 'bottomright',
			width: 500,
			marker: {
				centerOnHover: true,
				persist: true,
			},
		},
	},
};


/* Path GeoJSON layer options */
export const path = {
	style: {},
	fit: { padding: [10, 10] },
	animation: { speed: 100 },
};


/* Trail card */
export const card = {
	insights: [
		{
			field: 'distance',
			icon: 'ri-route-line',
			unit: 'km',
			format: meters => Math.round(meters / 100) / 10,
		},
		{
			field: 'duration',
			icon: 'ri-timer-line',
			unit: 'h',
			format(seconds) {
				const hours = Math.floor(seconds / 3600);
				const minutes = (seconds / 60) % 60;
				return `${hours}${minutes ? `:${minutes}` : ''}`;
			},
		},
		{
			field: 'drop_positive',
			icon: 'ri-arrow-up-line',
			unit: 'm',
			format: meters => meters,
		},
	],
};
