<template>
	<div class="leaflet__layer"></div>
</template>

<script>
import { geoJSON } from 'leaflet';
import injector from './mixin.injector';

export default {
	name: 'leaflet-layer',
	mixins: [injector],
	props: {
		data: { type: Object, required: true },
		options: { type: [Boolean, Object], default: false },
	},
	data() {
		return { layer: undefined };
	},
	methods: { animate() {} /* Abstract method to be overriden */ },
	async mounted() {
		const { name } = this.$options;
		const { parent, map, data, options } = this;
		const selector = Math.random().toString(36).substring(2);
		const style = { ...options.style, className: `${name} ${selector}` };
		this.layer = geoJSON(data, { style });
		await parent.flyToBounds(this.layer.getBounds(), options.fit);
		this.layer.addTo(map);
		if (options.animation) this.animate(selector);
	},
	beforeDestroy() {
		this.map.removeLayer(this.layer);
	},
};
</script>

<style>
.leaflet__layer { display: none; }
</style>
