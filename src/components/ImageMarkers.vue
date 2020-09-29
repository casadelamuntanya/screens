<template lang="html">
  <div class="image-markers">
		<slot />
		<div
			v-for="marker in markers"
			:key="`${marker.top}.${marker.left}`"
			:style="`left:${marker.left}%;top:${marker.top}%;`"
			class="image-marker">
			<slot name="marker" :marker="marker">&times;</slot>
			<div class="image-marker__popup" :style="alineation(marker)">
				<slot name="popup" :marker="marker">
					<div class="image-marker__popup-content">
						{{ marker.text }}
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'image-markers',
	props: {
		markers: { type: Array, required: true },
		adaptable: { type: Boolean, default: false },
	},
	methods: {
		alineation({ left, top }) {
			if (this.adaptable) {
				const leftAlign = left > 25 ? left > 75 ? '-100%' : '-50%' : '0';
				const topAlign = top > 25 ? top > 75 ? '-100%' : '-50%' : '0';
				return `transform: translate(${leftAlign}, ${topAlign}) !important;`;
			}
			return 'transform: translate(-50%, -100%) !important;';
		},
	},
};
</script>

<style lang="scss" scoped>
.image-markers {
	display: inline-block;
	position: relative;
}

.image-marker {
	display: inline-block;
	position: absolute;
	transform: translate(-50%, -50%);
	z-index: 0;

	&:hover { z-index: 1; }

	&__popup {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
	}

	&:hover > &__popup { display: block; }
}
</style>
