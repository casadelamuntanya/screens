<template lang="html">
  <modal :is-open.sync="open" class="lightbox">
		<slot :image="image">
			<img :src="image.image || image.img || image" draggable="false" />
		</slot>
		<span v-if="hasPrev" class="lightbox__prev" @click="prev">
			<slot name="prev">
				<button>&lsaquo;</button>
			</slot>
		</span>
		<span v-if="hasNext" class="lightbox__next" @click="next">
			<slot name="next">
				<button>&rsaquo;</button>
			</slot>
		</span>
	</modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
	name: 'lightbox',
	components: { Modal },
	props: {
		isOpen: { type: Boolean, required: true },
		images: { type: Array, required: true },
		active: { type: Number, default: 0 },
	},
	data() {
		return { imageIndex: this.active };
	},
	computed: {
		open: {
			get() { return this.isOpen; },
			set(value) { this.$emit('update:isOpen', value); },
		},
		hasPrev() { return this.imageIndex > 0; },
		hasNext() { return this.imageIndex < this.images.length - 1; },
		image() { return this.images[this.imageIndex]; },
	},
	watch: {
		imageIndex(value) {
			this.$emit('update:active', value);
			this.$emit('change', value);
		},
		active(value) { this.imageIndex = value; },
	},
	methods: {
		prev() { if (this.hasPrev) this.select(this.imageIndex - 1); },
		next() { if (this.hasNext) this.select(this.imageIndex + 1); },
		select(position) { this.imageIndex = position; },
	},
};
</script>

<style lang="scss">
.lightbox {

	img { display: block; }

	.modal__dialog { padding: 0; }

	&__prev {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}

	&__next {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(50%, -50%);
	}
}
</style>
