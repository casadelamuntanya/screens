<template lang="html">
	<div class="stack">
		<nav class="bar">
			<router-link
				v-for="section in sections"
				:key="section"
				:to="`/safety/${section.path}`">
				{{ $t(`safety.sections.${section.name}`) }}
			</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'safety',
	data() {
		return {
			sections: this.$router.options.routes
				.find(({ name }) => name === 'safety')
				.children,
		};
	},
};
</script>
