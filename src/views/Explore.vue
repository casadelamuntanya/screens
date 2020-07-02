<template lang="html">
  <div class="grid">
		<div class="row">
			<div class="col">
				<leaflet-map name="explore" :options="mapOptions">
					<leaflet-path
						v-if="track"
						:key="track.name"
						:data="track"
						:options="pathOptions" />
				</leaflet-map>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import api from '@/apis/airtable.explore';
import { LeafletMap, LeafletPath } from '@/components/leaflet/leaflet';

import {
	map as mapOptions,
	path as pathOptions,
	query,
} from '@/config/explore';

export default {
	name: 'explore',
	components: { LeafletMap, LeafletPath },
	data() {
		return {
			mapOptions,
			pathOptions,
			trails: [],
			selectedTrail: undefined,
		};
	},
	asyncComputed: {
		async track() {
			const { url } = this.selectedTrail?.track[0] || {};
			const { data } = url ? await axios.get(url) : {};
			return data;
		},
	},
	mounted() {
		const params = { ...query, locale: this.$i18n.locale };
		api.get(query.table, { params })
			.then((results) => { this.trails = results; });
	},
};
</script>
