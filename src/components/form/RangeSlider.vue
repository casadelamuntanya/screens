<template lang="html">
	<div class="range-slider">
		<div class="range-slider__output">
			<span class="range-slider__title">{{ title }}</span>
			<span class="range-slider__output-label">
				{{ this.$t(unlimit ? 'global.more_than' : 'global.from') | uppercase }}
			</span>
			{{ convert(range[0]) }}{{ unit }}
			<template v-if="!unlimit">
				<span class="range-slider__output-label">
					{{ this.$t('global.to') | uppercase }}
				</span>
				{{ convert(range[1]) }}{{ unit }}
			</template>
		</div>
		<range-slider
			v-model="range"
			:enable-cross="false"
			:step="options.step || 1"
			:min="limits[0]"
			:max="limits[1]" />
	</div>
</template>

<script>
import RangeSlider from 'vue-range-component';

export default {
	name: 'custom-filter-range',
	components: { RangeSlider },
	props: {
		value: { type: Array, required: true },
		title: { type: String, default: '' },
		options: { type: Object, required: true },
		unlimited: { type: Boolean, default: false },
	},
	data() {
		return { range: this.value || [] };
	},
	computed: {
		limits() { return this.options.limits || [0, 1]; },
		unit() { return this.options.unit?.to || ''; },
		unlimit() { return this.unlimited && this.range[1] === this.limits[1]; },
	},
	watch: {
		value(values) { this.range = values; },
		range(values) { this.$emit('input', values); },
	},
	methods: {
		convert(value) {
			const { unit } = this.options;
			return unit ? this.$units(value).from(unit.from).to(unit.to) : value;
		},
	},
};
</script>
