<template lang="html">
	<div class="stack">
		<nav id="kids-nav" class="stack">
			<router-link
				v-for="game in games"
				:key="game"
				:to="`/kids/${game}`"
				class="fill">
				<img :src="`/assets/images/kids/cover-${game}.jpg`" class="cover">
				<div>
					<h1>{{ $t(`kids.games.${game}.name`) }}</h1>
					<p>{{ $t(`kids.games.${game}.instructions`) }}</p>
				</div>
			</router-link>
		</nav>
	</div>
</template>

<script>
import { games } from '@/config/kids';

export default {
	name: 'kids',
	data() {
		return { games };
	},
};
</script>
