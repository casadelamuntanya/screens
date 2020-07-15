<template lang="html">
	<div class="fill stack">

		<!-- Animation -->
		<section class="fill cols">
			<div class="col col--6">
				<div class="box align-center" v-swipe="swipeTemperature">
					<img
						svg-inline
						src="@/assets/vectors/silhouettes/body.svg"
						:style="colors" />
				</div>
			</div>
			<div class="col col--auto">
				<div class="hypothermia-symptoms">
					<strong>{{ temperature | decimal(1) }}<sup>&deg;C</sup></strong>
					<ul class="tips">
						<li v-for="symptom in symptoms" :key="symptom">
							<i class="ri-close-fill icon icon--error" />
							{{ $t(`safety.hypothermia.symptoms.${symptom}`) }}
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Title -->
		<section class="cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.hypothermia.hypothermia') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p>{{ $t('safety.hypothermia.definition') }}</p>
				</div>
			</div>
		</section>

		<!-- Prevention and treatment -->
		<section class="cols">
			<div class="col col--auto">
				<div class="box box--midtone1">
					<h5>{{ $t('safety.prevention') }}</h5>
					<p class="note">{{ $t('safety.hypothermia.prevention') }}</p>
					<ul class="tips">
						<li v-for="(proceed, tip) in prevention" :key="tip">
							<i v-if="proceed" class="ri-check-line icon icon--success" />
							<i v-else class="ri-close-fill icon icon--error" />
							{{ $t(`safety.hypothermia.prevent.${tip}`) }}
						</li>
					</ul>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box box--dark">
					<h5>{{ $t('safety.treatment') }}</h5>
					<p class="note">{{ $t('safety.hypothermia.treatment') }}</p>
					<ul class="tips">
						<li v-for="(proceed, tip) in treatment" :key="tip">
							<i v-if="proceed" class="ri-check-line icon icon--success" />
							<i v-else class="ri-close-fill icon icon--error" />
							{{ $t(`safety.hypothermia.treat.${tip}`) }}
						</li>
					</ul>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import swipe from '@/utils/directive.swipe';
import interval from '@/utils/mixin.interval';
import { hypothermia } from '@/config/safety';

const { symptoms, prevention, treatment, colors } = hypothermia;
const constrain = (num, min, max) => Math.min(Math.max(num, min), max);

export default {
	name: 'view-safety-hypothermia',
	directives: { swipe },
	mixins: [interval],
	data() {
		return {
			temperature: 37,
			prevention,
			treatment,
		};
	},
	computed: {
		symptoms() {
			return Object.keys(symptoms).filter((symptom) => {
				const [min, max] = symptoms[symptom];
				return this.temperature >= min && this.temperature <= max;
			});
		},
		colors() {
			const coldColor = colors[constrain((37 - Math.ceil(this.temperature)) * 2, 0, 9)];
			const warmColor = colors[37 - Math.ceil(this.temperature)];
			return `--in-color:${warmColor}; --out-color:${coldColor};`;
		},
	},
	watch: {
		temperature: {
			immediate: true,
			handler(value) {
				if (value >= 37) {
					this.interval_stop();
					window.setTimeout(() => {
						this.interval_time = 500;
						this.interval_init();
					}, 2000);
				}
				if (value <= 28) {
					this.interval_stop();
					window.setTimeout(() => {
						this.interval_time = 20;
						this.interval_init(this.increaseTemperature);
					}, 5000);
				}
			},
		},
	},
	methods: {
		setTemperature(value) { this.temperature = constrain(value, 28, 37); },
		swipeTemperature({ percent: { y } }) { this.setTemperature(37 - (y * (37 - 27) / 100)); },
		decreaseTemperature() { this.setTemperature(this.temperature - 0.1); },
		increaseTemperature() { this.setTemperature(this.temperature + 0.1); },
		interval_next() { this.decreaseTemperature(); },
	},
};
</script>
