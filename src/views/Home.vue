<template>
	<div class="fullscreen">
		<div class="stack">
			<div @click="toggleNavigation" class="fill hero">
				<img
					svg-inline
					src="@/assets/vectors/logos/cdm.svg"
					class="logo logo--xxxl logo--animate" />
			</div>
			<div v-if="isNavigation">
				<nav class="bar">
					<a
						href="#"
						v-for="locale in locales"
						:key="locale.code"
						:class="{ 'active': isCurrentLocale(locale.code) }"
						@click.prevent="changeLocale(locale.code)">
						{{ locale.name | uppercase }}
					</a>
				</nav>
				<div class="main-nav" :style="`grid-template: ${layout};`">
					<router-link
						v-for="section in sections"
						:key="section.id"
						:to="`/${section.id}`"
						:class="`main-nav__box ${section.tint}`"
						:style="`grid-area: ${section.id}`">
						<img :src="section.img" class="cover" />
						<h2 class="text--l">{{ $t(`nav.section.${section.id}`) }}</h2>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { layout, sections } from '@/config/navigation';

export default {
	name: 'home',
	props: {
		activeNavigation: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			layout,
			sections,
			isNavigation: this.activeNavigation,
		};
	},
	computed: {
		locales() {
			const { availableLocales, messages } = this.$i18n;
			return availableLocales.map(code => ({
				name: messages[code].locale_name,
				code,
			}));
		},
		currentLocale() {
			return this.$i18n.locale;
		},
	},
	methods: {
		toggleNavigation() { this.isNavigation = !this.isNavigation; },
		changeLocale(code) { this.$i18n.locale = code; },
		isCurrentLocale(locale) { return locale === this.$i18n.locale; },
	},
};
</script>
