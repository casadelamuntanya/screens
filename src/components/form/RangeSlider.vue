<template lang="html">
	<div class="range-slider">
		<p class="range-slider__legend">
			<span class="range-slider__title">
				{{ $t(`${namespace}.attributes.${range.attr}`) }}
			</span>
			<span class="range-slider__output">{{ output }}</span>
		</p>
		<range-slider
			v-model="range.values"
			:enable-cross="false"
			:step="range.step || 1"
			:min="range.limits[0]"
			:max="range.limits[1]" />
	</div>
</template>

<script>
import RangeSlider from 'vue-range-component';

const required = ['attr', 'values', 'limits', 'unit'];
const hasAllKeys = obj => required.every(key => Object.keys(obj).includes(key));

export default {
	name: 'custom-filter-range',
	components: { RangeSlider },
	props: {
		namespace: { type: String, required: true },
		range: { type: Object, required: true, validator: hasAllKeys },
		unlimited: { type: Boolean, default: false },
	},
	computed: {
		output() {
			const { values, limits, unit } = this.range;
			const min = this.$units(values[0]).from(unit.from).to(unit.to);
			const max = this.$units(values[1]).from(unit.from).to(unit.to);
			return this.unlimited && values[1] === limits[1]
				? `${this.$t('global.more_than')} ${min}${unit.to}`
				: `${this.$t('global.from')} ${min}${unit.to} ${this.$t('global.to')} ${max}${unit.to}`;
		},
	},
};
</script>
