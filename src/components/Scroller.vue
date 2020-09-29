<template>
	<div class="scroller" v-drag-scroll>
			<div class="scroller__inner" :data-empty="emptyMsg">
				<slot />
			</div>
		</div>
</template>

<script>
import DragScroll from '@/utils/directive.drag-scroll';

export default {
	name: 'Scroller',
	directives: { DragScroll },
	props: {
		emptyMsg: {
			type: String,
			default: 'Nothing to show',
		},
	},
};
</script>

<style lang="scss">
.scroller {
  overflow: hidden;
	position: relative;
  box-sizing: border-box;
	user-select: none;

	&__inner {
		white-space: nowrap;
		transition: transform 0.5s ease-out;
	}
}
</style>
