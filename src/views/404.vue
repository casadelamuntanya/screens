<template lang="html">
  <div class="hero stack">
		<section class="align-center">
			<h4>{{ $t('global.404.not_available') }}</h4>
			<p class="note">{{ $t('global.404.come_back') }}</p>
			<p>
				<button class="btn" @click="$router.go(-1)">
					{{ $t('global.404.go_back') }}
				</button>
			</p>
			<img src="/assets/images/animated/compass_spin.gif" />
		</section>
	</div>
</template>
