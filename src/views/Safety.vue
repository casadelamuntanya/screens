<template lang="html">
	<div class="stack">
		<nav class="bar scroller">
			<router-link
				v-for="section in sections"
				:key="section"
				:to="`/safety/${section}`">
				{{ $t(`safety.sections.${section}`) }}
			</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'safety',
	data() {
	},
};
</script>
