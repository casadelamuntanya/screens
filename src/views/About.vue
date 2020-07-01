<template>
	<div class="grid">
		<div class="row row--fit">
			<youtube-video :video-id="introYoutubeVideo" :subs="$i18n.locale" />
		</div>
		<div class="row row--fit">
			<div class="col col--4">
				<div class="box">
					<h3>Casa de la Muntanya</h3>
				</div>
			</div>
			<div class="col">
				<div class="box">
					<p>{{ $t('about.description') }}</p>
					<p>{{ $t('about.goal') }}</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col col--fit col--center col--middle">
				<image-markers :markers="markers" class="floorplan" >
					<img svg-inline src="@/assets/vectors/floorplan.svg" />
					<i slot="marker" slot-scope="{ marker }" :class="marker.icon" />
					<div slot="popup" slot-scope="{ marker }" class="popup">
						<h6>{{ $t(`about.floorplan.${marker.id}.name`) }}</h6>
						<p>{{ $t(`about.floorplan.${marker.id}.description`)}}</p>
					</div>
				</image-markers>
			</div>
		</div>
	</div>
</template>

<script>
import YoutubeVideo from '@/components/YoutubeVideo.vue';
import ImageMarkers from '@/components/ImageMarkers.vue';

import { introYoutubeVideo, markers } from '@/config/about';

export default {
	name: 'about',
	components: { YoutubeVideo, ImageMarkers },
	data() {
		return { introYoutubeVideo, markers };
	},
};
</script>
