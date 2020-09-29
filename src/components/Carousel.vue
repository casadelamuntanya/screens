<template>
	<div class="carousel">
		<div ref="inner" :class="['carousel__inner', { 'carousel__inner--vertical': vertical }]">
			<div
				v-for="(_, index) in slides"
				:key="index"
				:class="itemClass('carousel__slide', index)"
				:data-slide="index">
				<slot :slide="slideReturn(index)">{{ index }}</slot>
			</div>
		</div>
		<ul v-if="pagination" class="carousel__pagination">
			<li
				v-for="(_, index) in slides"
				:key="index"
				@click="scrollTo(index)"
				:class="itemClass('carousel__pagination-step', index)">
				<slot name="pagination" :slide="slideReturn(index)">
					<span class="carousel__pagination-indicator"/>
				</slot>
			</li>
		</ul>
		<div v-if="controls" class="carousel__controls">
			<span class="carousel__controls-prev" @click="prev">
				<slot name="prev">
					<button>&lsaquo;</button>
				</slot>
			</span>
			<span class="carousel__controls-next" @click="next">
				<slot name="next">
					<button>&rsaquo;</button>
				</slot>
			</span>
		</div>
	</div>
</template>

<script>
import interval from '@/utils/mixin.interval';

export default {
	name: 'carousel',
	mixins: [interval],
	props: {
		slides: { type: Array, required: true },
		vertical: { type: Boolean, default: false },
		controls: { type: Boolean, default: false },
		pagination: { type: Boolean, default: false },
		autoplay: { type: Boolean, default: false },
		interval: { type: Number, default: 10000 },
		visibleSlides: { type: Number, default: 1 },
		value: { type: Number, default: 0 },
	},
	data() {
		return {
			interval_autoplay: this.autoplay,
			interval_time: this.interval,
			observer: null,
			active: this.value,
		};
	},
	watch: {
		value(index) { this.scrollTo(index); },
		active(current, prev) {
			this.interval_reset();
			this.$emit('scroll', current);
			this.$emit(current < prev ? 'scroll-prev' : 'scroll-next', current);
		},
	},
	methods: {
		slideReturn(position) {
			const { active, slides } = this;
			return { position, active: position === active, item: slides[position] };
		},
		itemClass(item, position) {
			const { active } = this;
			return [item, {
				[`${item}--active`]: position === active,
				[`${item}--prev`]: position === active - 1,
				[`${item}--next`]: position === active + 1,
			}];
		},
		scrollTo(index) {
			const { vertical, $refs: { inner } } = this;
			inner.scrollTo({
				top: vertical ? index * inner.clientHeight : 0,
				left: vertical ? 0 : index * inner.clientWidth,
				behavior: 'smooth',
			});
			this.$emit('input', index);
		},
		jump(steps) {
			const { active, slides } = this;
			const target = (active + slides.length + steps) % slides.length;
			this.scrollTo(target);
		},
		next() { this.jump(1); },
		prev() { this.jump(-1); },
		interval_next() { this.next(); },
	},
	mounted() {
		const options = { root: this.$refs.inner, rootMargin: '0px', threshold: [0.5] };
		this.observer = new IntersectionObserver((changes) => {
			changes.forEach(({ target, intersectionRatio }) => {
				if (intersectionRatio > 0.5) this.active = parseInt(target.dataset.slide, 10);
			});
		}, options);
		const slides = document.querySelectorAll('.carousel__slide');
		slides.forEach(slide => this.observer.observe(slide));
	},
	beforeDestroy() { this.observer.disconnect(); },
};
</script>

<style lang="scss" scoped>
.carousel {
	position: relative;

	&__inner {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		height: 100%;
		width: 100%;
		scroll-snap-type: x mandatory;
		overflow-x: auto;

		/* Hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar { display: none; }

		&--vertical {
			flex-direction: column;
			overflow-y: auto;
			scroll-snap-type: y mandatory;
		}
	}

	&__slide {
		flex: 0 0 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		scroll-snap-align: center;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	&__pagination {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;

		&-step { display: inline-block; }

		&-indicator {
			display: block;
			content: '';
			height: 4px;
			width: 30px;
			background: currentColor;
			margin: 0 3px 15px;
			opacity: 0.5;
		}
		&-step--active &-indicator { opacity: 1; }
	}

	&__controls {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 1;
	}
}
</style>
