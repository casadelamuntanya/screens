/* Airtable query options */
export const query = {
	base: 'appMWr6cRQN40oIM2',
	table: '/trails',
	fields: ['name', 'duration', 'distance', 'drop_positive', 'drop_negative', 'seasonality', 'img', 'track', 'milestones', 'wildlife', 'flora', 'culture'],
	localeFields: ['name'],
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
			name: 'Topographic',
			url: 'https://api.mapbox.com/styles/v1/markusand/ck4tte5dt1x7n1cod1yrxr0r1/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
			options: {
				attribution: '&copy; Marc Vilella',
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
			position: '100%',
			name: 'Satellite',
			url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
			options: {
				attribution: '&copy; Mapbox',
				accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
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
