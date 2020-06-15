<template>
	<div class="fullscreen">
		<div class="grid">
			<div @click="toggleNav" class="row">
				<div class="col col--fit col--center col--middle">
					<img
						svg-inline
						src="@/assets/vectors/logos/cdm.svg"
						class="logo logo--xxxl logo--animate" />
				</div>
			</div>
			<div class="row row--fit" :class="{ 'row--collapsed': isCollapsed }">
				<div class="bar">
					<a
						href="#"
						v-for="locale in locales"
						:key="locale.code"
						:class="{ 'active': isCurrentLocale(locale.code) }"
						@click.prevent="changeLocale(locale.code)">
						{{ locale.name | uppercase }}
					</a>
				</div>
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
		activeNav: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return { layout, sections, isCollapsed: !this.activeNav };
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
		toggleNav() { this.isCollapsed = !this.isCollapsed; },
		changeLocale(code) { this.$i18n.locale = code; },
		isCurrentLocale(locale) { return locale === this.$i18n.locale; },
	},
};
</script>
