<template lang="html">
	<div v-if="isOpen" class="modal">
		<div class="modal__dialog">
			<span v-if="!noCloseButton" class="modal__close" @click="close">
				<slot name="close">
					<button>&times;</button>
				</slot>
			</span>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'modal',
	props: {
		isOpen: { type: Boolean, required: true },
		noCloseButton: { type: Boolean, default: false },
	},
	methods: {
		open() { this.$emit('update:isOpen', true); },
		close() { this.$emit('update:isOpen', false); },
	},
};
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	z-index: 99;

	&__dialog {
		position: relative;
		margin: auto;
		max-width: 85%;
		max-height: 85%;
	}
}
</style>
