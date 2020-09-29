<template lang="html">
  <div class="stack">
		<trail-filters v-model="filterTrail">
			<scroller
				class="trail-cards"
				:empty-msg="$t('explore.empty_trail_search')">
				<trail-card
					v-for="trail in filteredTrails"
					:key="trail.name"
					:trail="trail"
					v-model="selectedTrail" />
			</scroller>
		</trail-filters>
		<leaflet-map name="explore" class="fill" :options="mapOptions">
			<leaflet-path
				v-if="track"
				:key="track.name"
				:data="track"
				:options="pathOptions" />
		</leaflet-map>
	</div>
</template>

<script>
import axios from 'axios';
import api from '@/apis/airtable.explore';
import { LeafletMap, LeafletPath } from '@/components/leaflet/leaflet';
import Scroller from '@/components/Scroller.vue';
import TrailCard from '@/components/TrailCard.vue';
import TrailFilters from '@/components/TrailFilters.vue';

import {
	map as mapOptions,
	path as pathOptions,
	query,
} from '@/config/explore';

export default {
	name: 'explore',
	components: { LeafletMap, LeafletPath, TrailCard, TrailFilters, Scroller },
	data() {
		return {
			mapOptions,
			pathOptions,
			trails: [],
			selectedTrail: undefined,
			filterTrail: undefined,
		};
	},
	computed: {
		filteredTrails() {
			return this.filterTrail ? this.trails.filter(this.filterTrail) : this.trails;
		},
	},
	asyncComputed: {
		async track() {
			const { url } = this.selectedTrail?.track[0] || {};
			const { data } = url ? await axios.get(url) : {};
			return data;
		},
	},
	watch: {
		filteredTrails(trails) {
			const isSelectedVisible = trails.some(trail => trail === this.selectedTrail);
			if (!isSelectedVisible) this.selectedTrail = undefined;
		},
	},
	mounted() {
		const params = { ...query, locale: this.$i18n.locale };
		api.get(query.table, { params })
			.then((results) => { this.trails = results; });
	},
};
</script>
