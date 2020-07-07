<template lang="html">
	<div class="filters">
		<div class="filters__select">
			<label v-for="(f, name) in filters" :key="name">
				<input type="radio" v-model="filter" :value="name">
				<h6>{{ $t(`explore.filters.${name}`) }}</h6>
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
	</div>
</template>

<script>
import { filters } from '@/config/explore';

const { profiles } = filters;
const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();

export default {
	name: 'trail-filters',
	props: { value: Function },
	data() {
		return {
			profiles,
			profile: undefined,
			filter: 'all',
		};
	},
	computed: {
		filters() {
			return {
				all: () => true,
				featured: trail => trail.do_it_now?.includes(currentMonth),
				customized: trail => (this.profile ? trail.profile?.includes(this.profile) : true),
			};
		},
	},
	watch: {
		filter: {
			immediate: true,
			handler(name) {
				const filter = this.filters[name] || this.filters.all;
				this.$emit('input', filter);
			},
		},
	},
};
</script>
