<template lang="html">
	<div class="stack">

		<!-- Cover -->
		<section class="fill">
			<figure class="cover">
				<img
					src="https://images.unsplash.com/photo-1499323544943-39d8e7b75615"
					draggable="false" />
				<figcaption>&copy; Photo by Anton Murygin from Unsplash</figcaption>
			</figure>
		</section>

		<!-- Principles -->
		<section class="box box--dark align-center">
			<ul class="icons-box">
				<li v-for="(principle, id) in principles" :key="id" class="col--auto">
					<i :class="`icon ${principle.icon}`" />
					<p class="title">{{ $t(`safety.base.principles.${principle.id}.title`) }}</p>
					<aside>{{ $t(`safety.base.principles.${principle.id}.description`) }}</aside>
				</li>
			</ul>
		</section>

		<!-- Title -->
		<hr />
		<section class="cols">
			<div class="col col--4">
				<div class="box">
					<h3>{{ $t('safety.base.safety') }}</h3>
				</div>
			</div>
			<div class="col col--auto">
				<div class="box">
					<p>{{ $t('safety.base.intro') }}</p>
					<p>{{ $t('safety.base.advice') }}</p>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import { principles } from '@/config/safety';

export default {
	name: 'safety-principles',
	data() {
		return { principles };
	},
};
</script>
