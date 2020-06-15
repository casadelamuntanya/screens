<template>
	<div id="app">
		<header>
			<div class="col col--fit">
				<router-link to="/navigation">
					<img svg-inline src="@/assets/vectors/logos/cdm.svg" class="logo logo--m" />
					<span class="heading">{{ $t('global.nav.menu') }}</span>
				</router-link>
			</div>
		</header>
		<main>
			<router-view />
		</main>
	</div>
</template>
