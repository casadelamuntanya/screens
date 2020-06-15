<template>
	<div class="grid">
		<div class="row row--fit">
			<youtube-video video-id="YAc0X-E4sXk" :subs="$i18n.locale" />
		</div>
		<div class="row">
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
	</div>
</template>

<script>
import YoutubeVideo from '@/components/YoutubeVideo.vue';

export default {
	name: 'about',
	components: { YoutubeVideo },
};
</script>
