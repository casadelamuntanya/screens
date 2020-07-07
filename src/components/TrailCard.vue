<template lang="html">
	<div :class="`card ${statusClass}`" @click="toggle">
		<img :src="trail.img[0].url" class="cover" />
		<em v-if="isFeatured" class="badge badge--alert">
			{{ $t('explore.card.do_it_now') }}
		</em>
		<h5 class="title">{{ trail.name }}</h5>
		<ul class="insights">
			<li v-for="insight in card.insights" :key="insight.field">
				<em class="value">{{ insight.format(trail[insight.field]) }}</em>
				<i :class="`icon ${insight.icon}`" />
				<p class="unit">{{ $t(`explore.card.${insight.field}.unit`) }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { card } from '@/config/explore';

export default {
	name: 'trail-card',
	props: {
		value: { type: Object },
		trail: { type: Object, required: true },
	},
	data() {
		return { card };
	},
	computed: {
		isActive() {
			return this.value === this.trail;
		},
		isFeatured() {
			const month = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();
			return this.trail.do_it_now?.includes(month);
		},
		statusClass() {
			return this.value
				? this.isActive
					? 'card--active'
					: 'card--inactive'
				: '';
		},
	},
	methods: {
		toggle() {
			const value = this.isActive ? null : this.trail;
			this.$emit('input', value);
		},
	},
};
</script>
