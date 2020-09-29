<template>
	<div class="stack hero">
		<img v-if="poster" :src="poster">
		<section v-else class="align-center">
			<p>{{ $t('exhibitions.no_current') }}</p>
			<p>
				<button class="btn" @click="$router.go(-1)">
					{{ $t('global.404.go_back') }}
				</button>
			</p>
		</section>
	</div>
</template>

<script>
import api from '@/apis/airtable.exhibitions';
import query from '@/config/exhibitions';

export default {
	name: 'Exhibitions',
	data() {
		return { exhibitions: [] };
	},
	computed: {
		poster() {
			const today = new Date();
			return this.exhibitions
				.filter(({ until }) => today <= until)
				.sort((a, b) => a.from - b.from)[0]?.poster;
		},
	},
	mounted() {
		api.get(query.table).then((results) => {
			this.exhibitions = results.map(exhibition => ({
				name: exhibition.name,
				author: exhibition.author,
				poster: exhibition.poster?.[0]?.url,
				from: new Date(exhibition.from),
				until: new Date(exhibition.until),
			}));
		});
	},
};
</script>
