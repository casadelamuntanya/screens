<template lang="html">
	<div class="youtube__wrapper">
		<iframe
			ref="videoframe"
			:src="url"
			:height="`${videoHeight}px`"
			width="100%"
			class="youtube__video" />
		<p v-if="credits" class="youtube__credits">&copy; {{ credits }}</p>
	</div>
</template>

<script>
export default {
	name: 'youtube-video',
	props: {
		videoId: { type: String, required: true },
		subs: { type: String, default: 'ca' },
		ratio: { type: Number, default: 56.25 },
		start: { type: Number, default: 0 },
		end: { type: Number, default: undefined },
		credits: { type: String, requird: true },
	},
	data() {
		return { videoHeight: 1000 };
	},
	computed: {
		url() {
			const options = {
				rel: 0, // Hide related videos
				fs: 0, // Disable fullscreen
				controls: 0, // Hide controls
				showinfo: 0, // Hide video info
				iv_load_policy: 3, // Disable video annotations
				modestbranding: 1, // Hide YouTube logo
				autoplay: 1, // Autoplay video on load
				mute: 1, // Mute video, needed for autoplay to work
				loop: 1, // Loop video (prevents displaying related videos)
				playlist: this.videoId, // Needed for loop function
				vq: 'hd1080', // Video in HD
				cc_load_policy: 1, // Force subtitles
				hl: this.subs, // Subtitles language
				start: this.start,
				end: this.end,
			};
			const params = Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&');
			return `https://www.youtube.com/embed/${this.videoId}?${params}`;
		},
	},
	mounted() {
		const { offsetWidth } = this.$refs.videoframe;
		this.videoHeight = offsetWidth * this.ratio / 100;
	},
};
</script>

<style lang="scss">
.youtube {
	&__wrapper { position: relative; }

	&__video {
		pointer-events: none;
		vertical-align: top;
	}

	&__credits {
		position: absolute;
		bottom: 0;
	}
}
</style>
