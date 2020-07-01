<template lang="html">
  <div class="grid">
		<div class="row">
			<div class="col">
				<leaflet-map name="explore" :options="map">
				</leaflet-map>
			</div>
		</div>
	</div>
</template>

<script>
import { LeafletMap } from '@/components/leaflet/leaflet';

import { map } from '@/config/explore';

export default {
	name: 'explore',
	components: { LeafletMap },
	data() {
		return {
			map,
		};
	},
};
</script>
