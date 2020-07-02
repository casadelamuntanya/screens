<script>
import LeafletLayer from './LeafletLayer.vue';

export default {
	name: 'leaflet-path',
	extends: LeafletLayer,
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
			setTimeout(() => {
				path.setAttribute('stroke-dasharray', 0);
				this.$emit('animation:end', this);
			}, duration * 1000);
		},
	},
};
</script>
