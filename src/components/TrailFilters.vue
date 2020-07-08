<template lang="html">
	<div class="bar bar--unfold align-right">
		<label v-for="(_, name) in basicFilters" :key="name">
			<input type="radio" v-model="filter" :value="name" />
			<h5>{{ $t(`explore.filters.${name}`) }}</h5>
		</label>
		<label>
			<input type="checkbox" v-model="showAdvanced" />
			<h5 :data-badge="countAdvanced"><i class="ri-equalizer-line icon" /></h5>
		</label>
		<div v-if="filter === 'customized'" class="panel">
			<div class="profiles">
				<label v-for="name in profiles" :key="name">
					<input type="radio" v-model="profile" :value="name" />
					<div>
						<img :src="require(`@/assets/vectors/profiles/${name}.svg`)" />
						<span>{{ $t(`explore.profiles.${name}`) | uppercase }}</span>
					</div>
				</label>
			</div>
		</div>
		<div v-if="showAdvanced" class="panel">
			<div class="cols">
				<hr />
				<div class="col col--5">
					<range-slider
						v-for="(range, i) in ranges"
						:key="i"
						:options="range"
						v-model="range.values"
						:title="$t(`explore.trails.attributes.${range.attr}`)"
						unlimited />
				</div>
				<hr />
				<div class="col col--auto">
					<picker
						v-for="(picker, i) in pickers"
						:key="i"
						:options="picker.options"
						v-model="picker.values"
						:title="$t(`explore.trails.attributes.${picker.attr}`)"
						v-slot="{ option }">
						{{ $t(`explore.trails.${picker.attr}.${option}`) | uppercase }}
					</picker>
				</div>
				<hr />
			</div>
			<p v-if="countAdvanced" class="align-center">
				<button class="btn" @click="clearAdvanced">
					{{ $t('explore.filters.clear') }}
				</button>
			</p>
		</div>
		<div class="panel">
			<slot />
		</div>
	</div>
</template>

<script>
import RangeSlider from '@/components/form/RangeSlider.vue';
import Picker from '@/components/form/Picker.vue';
import { filters as filtersConfig } from '@/config/explore';

const { profiles, ranges, pickers } = filtersConfig;
const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();

const inRange = (value, min, max) => value >= min && value <= max;
const hasAny = (arr, items) => !items.length || (arr && items.some(i => arr.includes(i)));

export default {
	name: 'trail-filters',
	props: { value: Function },
	components: { RangeSlider, Picker },
	data() {
		return {
			profiles,
			ranges: [],
			pickers: [],
			profile: undefined,
			filter: undefined,
			showAdvanced: false,
		};
	},
	computed: {
		basicFilters() {
			return {
				all: () => true,
				featured: trail => trail.do_it_now?.includes(currentMonth),
				customized: trail => (this.profile ? trail.profile?.includes(this.profile) : true),
			};
		},
		advancedFilters() {
			const advancedFilters = [
				// Collection of filters that check if an array contains ANY of the picked options
				...this.pickers.map(({ attr, values }) => trail => hasAny(trail[attr], values)),
				// Collection of filters that check if a trail attribute is inside range
				...this.ranges.map(({ attr, values, limits }) => {
					const max = values[1] === limits[1] ? Infinity : values[1];
					return trail => inRange(trail[attr], values[0], max);
				}),
			];
			// Checks that trail passes all advanced filters
			return trail => advancedFilters.every(filter => filter(trail));
		},
		filters() {
			const basicFilter = this.basicFilters[this.filter] || this.basicFilters.all;
			return trail => basicFilter(trail) && this.advancedFilters(trail);
		},
		countAdvanced() {
			const countPickers = this.pickers.reduce((acc, { values }) => acc + !!values.length, 0);
			const countRanges = this.ranges.reduce((acc, { values, limits }) => {
				const changed = values[0] !== limits[0] || values[1] !== limits[1];
				return acc + changed;
			}, 0);
			return (countPickers + countRanges) || null;
		},
	},
	watch: {
		filters(filters) {
			this.$emit('input', filters);
		},
	},
	methods: {
		clearAdvanced() {
			this.ranges = ranges.map(range => ({ ...range, values: range.limits }));
			this.pickers = pickers.map(picker => ({ ...picker, values: [] }));
		},
	},
	mounted() {
		this.clearAdvanced();
		this.filter = 'all';
	},
};
</script>
