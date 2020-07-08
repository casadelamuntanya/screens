<script>
import { GeoJSON } from 'leaflet';
import LeafletLayer from './LeafletLayer.vue';

export default {
	name: 'leaflet-path',
	extends: LeafletLayer,
	data() {
		return { animationTimeout: null };
	},
	methods: {
		animate(selector) {
			const { options: { animation } } = this;
			const path = document.querySelector(`.${selector}`);
			const length = path.getTotalLength();
			const duration = length / animation.speed;
			this.$emit('animation:start', this);
			path.style.animation = `dash ${duration}s linear forwards`;
			path.setAttribute('stroke-dasharray', length);
			path.setAttribute('stroke-dashoffset', length);
			this.animationTimeout = setTimeout(() => {
				path.setAttribute('stroke-dasharray', 0);
				this.$emit('animation:end', this);
			}, duration * 1000);
		},
	},
	mounted() {
		const coordinates = this.data.features.reduce((acc, feature) => {
			const latLngs = GeoJSON.coordsToLatLngs(feature.geometry.coordinates);
			acc.push(...latLngs);
			return acc;
		}, []);
		this.map.fire('trail:add', { coordinates });
	},
	beforeDestroy() {
		clearTimeout(this.animationTimeout);
		this.map.fire('trail:remove');
	},
};
</script>
