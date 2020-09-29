<template lang="html">
	<div class="fill stack">

		<!-- Cover -->
		<section class="fill">
			<figure class="cover">
				<img
					src="https://images.pexels.com/photos/263356/pexels-photo-263356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
					draggable="false" />
					<figcaption>&copy; Photo by Pixabay from Pexels</figcaption>
			</figure>
		</section>

		<!-- Emergency phone -->
		<section class="cols">
			<div class="col col--4">
				<div class="box box--alert hero">
					<p class="rescue-emergency-phone">112</p>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box box--alert hero">
					<div>
						<h5>{{ $t('safety.rescue.phone') }}</h5>
						<p>{{ $t('safety.rescue.phone_eu') }}</p>
						<p class="note text--s">{{ $t('safety.rescue.disclaimer') }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Title -->
		<hr/>
		<section class="cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.rescue.rescue') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p>{{ $t('safety.rescue.call') }}</p>
					<ul class="tips">
						<li v-for="tip in tips" :key="tip">
							<i class="ri-check-line icon icon--success" />
							<h5>{{ $t(`safety.rescue.${tip}`) | uppercase }}</h5>
							{{ $t(`safety.rescue.call_${tip}`) }}
						</li>
					</ul>
					<p>{{ $t('safety.rescue.call_do_not_hang') }}</p>
				</div>
			</div>
		</section>
		<hr/>

		<!-- Distress signals -->
		<section class="cols">
			<div class="col col--auto">
				<div class="box box--midtone1">
					<p>{{ $t('safety.rescue.sos') }}</p>
					<p class="align-center text--xxxl">SOS</p>
					<h4 class="align-center note">
						&middot;&middot;&middot;
						&minus;&minus;&minus;
						&middot;&middot;&middot;
					</h4>
					<p>{{ $t('safety.rescue.sos_morse') }}</p>
				</div>
			</div>
			<div class="col col--6">
				<div class="box box--midtone1">
					<p>{{ $t('safety.rescue.distress_signal_helicopter') }}</p>
					<div class="cols">
						<div class="col col--auto align-center">
							<img
								svg-inline
								src="@/assets/vectors/silhouettes/hands_up.svg"
								class="rescue-distress-silhouette" />
							<h5>YES</h5>
							<p class="note text--s">
								{{ $t('safety.rescue.distress_signal_ko') }}
							</p>
						</div>
						<div class="col col--auto align-center">
							<img
								svg-inline
								src="@/assets/vectors/silhouettes/hand_up.svg"
								class="rescue-distress-silhouette" />
							<h5>NO</h5>
							<p class="note text--s">
								{{ $t('safety.rescue.distress_signal_ok') }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
export default {
	name: 'safety-rescue',
	data() {
		return { tips: ['what', 'when', 'where', 'who', 'follow_up'] };
	},
};
</script>
