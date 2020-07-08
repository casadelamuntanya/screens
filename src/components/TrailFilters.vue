<template lang="html">
	<div class="filters">
		<div class="filters__select">
			<label v-for="(f, name) in basicFilters" :key="name">
				<input type="radio" v-model="filter" :value="name">
				<h6>{{ $t(`explore.filters.${name}`) }}</h6>
			</label>
			<label>
				<input type="checkbox" v-model="showAdvanced" />
				<h6><i class="icon ri-equalizer-line" /></h6>
			</label>
		</div>
		<ul v-if="filter === 'customized'" class="filters__profiles scroller">
			<li v-for="p in profiles" :key="p">
				<label>
					<input type="radio" v-model="profile" :value="p">
					<span>
						<img :src="`/assets/images/profiles/${p}.jpg`" />
						{{ $t(`explore.profiles.${p}`) }}
					</span>
				</label>
			</li>
		</ul>
		<div v-if="showAdvanced" class="filters__advanced">
			<div class="grid">
				<div class="row">
					<section class="col col--6">
						<div class="box">
							<range-slider
								v-for="range in ranges"
								:key="range.attr"
								:range="range"
								namespace="explore.trails"
								unlimited />
						</div>
					</section>
					<section class="col">
						<div class="box">
							<picker
								v-for="picker in pickers"
								:key="picker.attr"
								:picker="picker"
								:columns="3"
								namespace="explore.trails" />
							<p class="note text--s">{{ $t('explore.disclaimer') }}</p>
						</div>
					</section>
				</div>
			</div>
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
			ranges: ranges.map(range => ({ ...range, values: range.limits })),
			pickers: pickers.map(picker => ({ ...picker, values: [] })),
			profile: undefined,
			filter: 'all',
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
	},
	watch: {
		filters(filters) {
			this.$emit('input', filters);
		},
	},
};
</script>
