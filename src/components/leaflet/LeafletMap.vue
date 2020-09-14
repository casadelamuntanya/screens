<template>
	<div :id="name" class="leaflet__map" v-resize="resize">
		<slot v-if="map" />
	</div>
</template>


<script>
import { map, tileLayer, control } from 'leaflet';
import './controls/control.leaflet-compare';
import './controls/control.leaflet-elevation';
import ResizeDirective from '@/utils/directive.resize';
import { bindAllMapEvents } from './events.map';

export default {
	name: 'leaflet-map',
	directives: { resize: ResizeDirective },
	provide() {
		// Make this component and the map accessible to all children components
		return { injectMap: () => this.map, parent: this };
	},

	props: {
		name: { type: String, required: true },
		options: {
			type: Object,
			default: () => ({
				tiles: [{
					name: 'default',
					url: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
					options: { attribution: '&copy; OpenStreetMaps' },
				}],
			}),
		},
	},
	data() {
		return { map: undefined };
	},

	computed: {
		tiles() {
			return this.options.tiles.reduce((acc, { name, url, options }) => {
				acc[name] = tileLayer(url, options);
				return acc;
			}, {});
		},
	},

	methods: {
		setControls({ attribution, zoom, scale, layers, elevation, compare }) {
			if (attribution) control.attribution(attribution).addTo(this.map);
			if (zoom) control.zoom(zoom).addTo(this.map);
			if (scale) control.scale(scale).addTo(this.map);
			if (layers) control.layers(this.tiles, null, layers).addTo(this.map);
			if (elevation) control.elevation(elevation).addTo(this.map);
			if (compare) {
				const { url, options, orientation, thumbPosition } = compare;
				const tiles = Object.values(this.tiles);
				const compareTile = tileLayer(url, options).addTo(this.map);
				control.compare(tiles, compareTile, { orientation, thumbPosition }).addTo(this.map);
			}
		},
		async panTo(center, options) {
			this.map.panTo(center, options);
			return new Promise(resolve => this.map.once('moveend', event => resolve(event)));
		},
		async flyTo(center, zoom = this.zoom, options) {
			this.map.flyTo(center, zoom, options);
			this.map.fire('flystart', this.map);
			return new Promise(resolve => this.map.once('flyend', event => resolve(event)));
		},
		async flyToBounds(bounds, options) {
			this.map.flyToBounds(bounds, options);
			this.map.fire('flystart', this.map);
			return new Promise(resolve => this.map.once('flyend', event => resolve(event)));
		},
		resize() {
			this.map.invalidateSize();
			this.map.fire('resize');
		},
	},

	mounted() {
		const { name, options, tiles } = this;
		this.map = map(name, {
			...options,
			zoomControl: false,
			scrollWheelZoom: false,
			attributionControl: false,
			layers: Object.values(tiles),
		});
		bindAllMapEvents(this);
		this.setControls(options.controls);
	},
};
</script>

<style>
.leaflet__map { height: 100%; }
</style>
