<template lang="html">
	<div class="fill stack">

		<!-- Cover -->
		<section class="fill">
			<img
				src="/assets/images/mockups/trekking_gear.png"
				class="cover"
				draggable="false" />
		</section>

		<!-- Title -->
		<section class="cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.gear.gear') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p>{{ $t('safety.gear.introduction') }}</p>
					<p>{{ $t('safety.gear.select_equipment') }}</p>
				</div>
			</div>
		</section>

		<!-- Gear list -->
		<section class="cols">
			<div class="col col--8">
				<div class="box box--dark">
					<h5 class="align-center">{{ $t('safety.gear.essentials') }}</h5>
					<p class="note align-center">
						{{ $t('safety.gear.essentials_caption') }}
					</p>
					<ul class="tips text-columns-2">
						<li v-for="item in gear.essentials" :key="item">
							<i class="ri-check-line icon icon--success" />
							{{ $t(`safety.gear.items.${item}`) | capitalize }}
						</li>
					</ul>
					<p class="note">{{ $t('safety.gear.essentials_disclaimer') }}</p>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box box--midtone1">
					<h5 class="align-center">{{ $t('safety.gear.recommended') }}</h5>
					<ul class="tips">
						<li v-for="item in gear.recommended" :key="item">
							<i class="ri-check-line icon icon--success" />
							{{ $t(`safety.gear.items.${item}`) | capitalize }}
						</li>
					</ul>
				</div>
			</div>
			<div class="col col--12">
				<p class="box box--alert align-middle">
					{{ $t('safety.gear.avalanche') }}
					<router-link to="/snow/safety" class="btn align-right">
						{{ $t('global.know_more') }}
					</router-link>
				</p>
			</div>
		</section>

	</div>
</template>

<script>
import { gear } from '@/config/safety';

export default {
	name: 'view-safety-gear',
	data() {
		return { gear };
	},
};
</script>
