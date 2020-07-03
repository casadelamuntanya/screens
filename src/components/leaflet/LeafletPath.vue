<script>
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
	beforeDestroy() {
		clearTimeout(this.animationTimeout);
	},
};
</script>
