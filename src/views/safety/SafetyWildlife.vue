<template lang="html">
	<div class="fill stack">

		<!-- Title -->
		<section class="fill cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.wildlife.dangerous_species') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p class="note">{{ $t('safety.wildlife.introduction') }}</p>
				</div>
			</div>
		</section>

		<!-- Species -->
		<section v-for="(specie, i) in species" :key="specie.name" :class="rowClass(i)">
			<div class="col col--auto">
				<div class="box box--midtone1">
					<h4>{{ $t(`safety.wildlife.${specie.name}.name`) }}</h4>
					<p>{{ $t(`safety.wildlife.${specie.name}.description`) }}</p>
					<p>{{ $t(`safety.wildlife.${specie.name}.habitat`) }}</p>
					<p>
						<strong>
							{{ $t(`safety.wildlife.${specie.name}.disclaimer`) }}
						</strong>
					</p>
				</div>
			</div>
			<div class="col col--auto stack">
				<figure v-if="hasOne(specie.image)" class="cover">
					<img :src="specie.image.src" />
					<figcaption>&copy; {{ specie.image.copyright }}</figcaption>
				</figure>
				<carousel v-else :slides="specie.image" controls autoplay class="fill">
					<figure slot-scope="{ slide }" class="cover">
						<img :src="slide.item.image.src" />
						<figcaption class="caption caption--b-l">
							{{ $t(`safety.wildlife.${specie.name}.${slide.item.name}`) }}
							&middot; &copy; {{ slide.item.image.copyright }}
						</figcaption>
					</figure>
				</carousel>
			</div>
		</section>

	</div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import { species } from '@/config/safety';

export default {
	name: 'view-safety',
	components: { Carousel },
	data() {
		return { species };
	},
	methods: {
		rowClass(i) {
			const even = this.species.length % 2;
			return ['cols', { 'cols--reverse': (i + !even) % 2 }];
		},
		hasOne(img) { return !Array.isArray(img); },
	},
};
</script>
