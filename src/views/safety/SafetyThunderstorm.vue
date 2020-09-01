<template lang="html">
	<div class="stack">

		<!-- Cover -->
		<youtube-video
			video-id="Ur4k8cAuQUY"
			:start="159"
			:end="312"
			credits="Video by Mike Olbinski from Youtube" />

		<!-- Main -->
		<hr/>
		<section class="fill cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.thunderstorm.thunderstorm') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p>{{ $t('safety.thunderstorm.introduction') }}</p>
				</div>
			</div>
		</section>
		<hr/>

		<section class="box box--dark">
			<p>{{ $t('safety.thunderstorm.calc_distance.introduction') }}</p>
			<p class="text--xl align-center">
				{{ $t('safety.thunderstorm.calc_distance.distance') }} (km) =
				{{ $t('safety.thunderstorm.calc_distance.seconds') }} / 3</p>
			<p>{{ $t('safety.thunderstorm.calc_distance.direction') }}</p>
			<p class="note text--s">{{ $t('safety.thunderstorm.calc_distance.explanation') }}</p>
		</section>

		<section class="cols">
			<div class="col col--5">
				<div class="box box--midtone1">
					<h5>{{ $t('safety.thunderstorm.position.position') }}</h5>
					<p class="note text--s">
						{{ $t('safety.thunderstorm.position.introduction') }}
					</p>
					<image-markers :markers="markers" class="safety-position">
						<img svg-inline src="@/assets/vectors/silhouettes/crouching.svg" />
						<i slot="marker" class="ri-add-line icon" />
						<p slot="popup" slot-scope="{ marker }" class="popup">
							{{ $t(`safety.thunderstorm.position.${marker.id}`) }}
						</p>
					</image-markers>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box box--midtone1">
					<h5>{{ $t('safety.thunderstorm.in_case_of') }}</h5>
					<ul class="tips">
						<li v-for="(proceed, tip) in tips" :key="tip">
							<i v-if="proceed" class="ri-check-line icon icon--success" />
							<i v-else class="ri-close-fill icon icon--error" />
							{{ $t(`safety.thunderstorm.tips.${tip}`) }}
						</li>
					</ul>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import YoutubeVideo from '@/components/YoutubeVideo.vue';
import ImageMarkers from '@/components/ImageMarkers.vue';
import { thunderstorm } from '@/config/safety';

const { tips } = thunderstorm;

export default {
	name: 'view-safety-thunderstorm',
	components: { YoutubeVideo, ImageMarkers },
	data() {
		return {
			tips,
			markers: [
				{ id: 'crouch', left: 20, top: 55 },
				{ id: 'ears', left: 83, top: 23 },
				{ id: 'heels', left: 38, top: 78 },
				{ id: 'floor', left: 67, top: 87 },
			],
		};
	},
};
</script>
