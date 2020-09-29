export default {
	data() {
		return {
			interval_instance: undefined,
			interval_time: 1000,
			interval_autoplay: false,
		};
	},
	methods: {
		interval_init(nextTick = this.interval_next) {
			this.interval_instance = window.setInterval(() => {
				nextTick();
			}, this.interval_time);
		},
		interval_reset(force = false) {
			if (this.interval_instance || force) {
				this.interval_stop();
				this.interval_init();
			}
		},
		interval_stop() { window.clearInterval(this.interval_instance); },
		interval_next() {},
	},
	mounted() {
		if (this.interval_autoplay) this.interval_init();
	},
	beforeDestroy() { this.interval_stop(); },
};
