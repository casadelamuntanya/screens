<template>
	<div class="stack">
		<div class="bar">
			<label v-for="section in sections" :key="section.name">
				<input type="radio" v-model="activeSection" :value="section.name" />
				<h5><i :class="`icon ${section.icon}`" /></h5>
			</label>
		</div>

		<div class="fill">

			<!-- COLORS -->
			<section v-if="activeSection === 'colors'" class="stack">
				<div class="cols fill">
					<div class="col col--auto">
						<div class="box hero">
							<img svg-inline
								src="@/assets/vectors/logos/cdm.svg"
								class="logo logo--xxxl" />
						</div>
					</div>
					<div class="col col--auto">
						<div class="box box--dark hero">
							<img svg-inline
								src="@/assets/vectors/logos/cdm.svg"
								class="logo logo--reverse logo--xxxl" />
						</div>
					</div>
					<div class="col col--auto">
						<div class="box box--primary hero">
							<img svg-inline
								src="@/assets/vectors/logos/cdm.svg"
								class="logo logo--reverse logo--xxxl" />
						</div>
					</div>
				</div>
				<hr />
				<div class="cols">
					<div v-for="i in 6" :key="i" class="col col--2">
						<div :class="`box box--midtone${i}`" />
					</div>
				</div>
				<hr />
				<div class="box box--alert" />
			</section>

			<!-- LAYOUT -->
			<section v-if="activeSection === 'layout'">

				<!-- COLUMNS -->
				<div v-for="cols in [2, 3, 4, 6, 12]" :key="cols" class="cols">
					<div v-for="col in cols" :key="col" :class="`col col--${12 / cols}`">
						<div :class="`box box--midtone${col % 7}`" />
					</div>
				</div>

				<!-- BARS -->
				<nav class="bar">
					<a v-for="lang in languages" :key="lang">{{ lang }}</a>
				</nav>
				<div class="bar">
					<label v-for="filter in basicFilters" :key="filter">
						<input type="radio" name="filter" :value="filter" />
						<h5>{{ filter }}</h5>
					</label>
					<label>
						<input type="checkbox" />
						<h5><i class="ri-equalizer-line icon" /></h5>
					</label>
				</div>

				<!-- BOXES -->
				<div class="cols">
					<div class="col col--3">
						<article class="box">
							<h5>Title</h5>
							<p>{{ lorem }}</p>
							<p class="note">{{ lorem | truncate(21) }}</p>
						</article>
					</div>
					<div v-for="i in 6" :key="i" class="col col--3">
						<article :class="`box box--midtone${i}`">
							<h5>Title</h5>
							<p>{{ lorem }}</p>
							<p class="note">{{ lorem | truncate(21) }}</p>
						</article>
					</div>
					<div class="col col--3">
						<article class="box box--dark">
							<h5>Title</h5>
							<p>{{ lorem }}</p>
							<p class="note">{{ lorem | truncate(21) }}</p>
						</article>
					</div>
				</div>

				<!-- SCROLLER -->
				<div class="scroller scroller--stripe" data-empty="No results found">
					<div v-for="i in 10" :key="i" class="box box--dark">
						<h6>Box {{ i }}</h6>
						<p>{{ lorem }}</p>
					</div>
				</div>

				<!-- MODAL -->
				<div class="box">
					<button class="btn" @click="modal = true">Modal</button>
					<button class="btn" @click="lightbox = true">Lightbox</button>
					<modal :is-open.sync="modal">
						<h4>Title</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</modal>

					<lightbox :is-open.sync="lightbox" :images="slides" />
				</div>
			</section>

			<!-- TYPOGRAPHY -->
			<section v-if="activeSection === 'typography'">
				<!-- HEADINGS -->
				<div class="cols">
					<div class="col col--12">
						<article class="box">
							<h1>Heading 1</h1>
							<p class="text--xxl">{{ lorem }}</p>
						</article>
					</div>
					<div class="col col--7">
						<article class="box">
							<h2>Heading 2</h2>
							<p class="text--xl">{{ lorem }}</p>
						</article>
					</div>
					<div class="col col--5">
						<article class="box">
							<h3>Heading 3</h3>
							<p class="text--l">{{ lorem }}</p>
						</article>
					</div>
					<div class="col col--4">
						<article class="box">
							<h4>Heading 4</h4>
							<p>{{ lorem }}</p>
						</article>
					</div>
					<div class="col col--4">
						<article class="box">
							<h5>Heading 5</h5>
							<p>{{ lorem }}</p>
						</article>
					</div>
					<div class="col col--4">
						<article class="box">
							<h6>Heading 6</h6>
							<p>{{ lorem }}</p>
						</article>
					</div>
				</div>

				<article class="cols">
					<div class="col col--4">
						<div class="box">
							<h3>Main lateral heading</h3>
						</div>
					</div>
					<div class="col col--auto">
						<div class="box">
							<p>{{ lorem.repeat(4) }}</p>
							<p>{{ lorem.repeat(2) }}</p>
						</div>
					</div>
				</article>

				<div class="bar">
					<h4>Centered heading</h4>
				</div>

				<article class="box">
					<div class="text-columns-3">
						<p>{{ lorem.repeat(3) }}</p>
						<p>{{ lorem.repeat(3) }}</p>
					</div>
				</article>
			</section>

			<!-- INPUTS -->
			<section v-if="activeSection === 'input'">

				<!-- BUTTONS -->
				<div class="box">
					<div>
						<button class="btn">Basic</button>
						<button class="btn">
							<i class="ri-search-line icon" />
							<span>Icon</span>
						</button>
						<button class="btn"><i class="ri-search-line icon" /></button>
						<button class="btn btn--reverse">Reverse</button>
						<button class="btn btn--flat">Flat</button>
						<button class="btn btn--primary">Primary</button>
						<button class="btn btn--alert">Alert!</button>
						<button class="btn" disabled>Disabled</button>
						<button class="btn btn--loading">Loading</button>
					</div>
					<button class="btn btn--block">Block</button>
					<div>
						<fieldset class="btn-group">
							<button class="btn"><i class="ri-bold icon"></i></button>
							<button class="btn"><i class="ri-italic icon"></i></button>
							<button class="btn"><i class="ri-underline icon"></i></button>
						</fieldset>
						<fieldset class="btn-group">
							<button class="btn"><i class="ri-align-left icon"></i></button>
							<button class="btn"><i class="ri-align-center icon"></i></button>
							<button class="btn"><i class="ri-align-right icon"></i></button>
							<button class="btn"><i class="ri-align-justify icon"></i></button>
						</fieldset>
						<button class="btn"><i class="ri-attachment-2 icon"></i></button>
					</div>
				</div>

				<!-- RANGE -->
				<div class="cols">
					<div class="col col--6">
						<div class="box">
							<range-slider
								v-for="(range, i) in ranges"
								:key="i"
								:options="range"
								v-model="range.values"
								title="Range slider" />
						</div>
					</div>
					<div class="col col--6">
						<div class="box">
							<picker
								v-for="(picker, i) in pickers"
								:key="i"
								:options="picker.options"
								v-model="picker.values"
								title="Picker" />
						</div>
					</div>
				</div>
			</section>

			<!-- IMAGES -->
			<section v-if="activeSection === 'images'" class="stack">

				<!-- COVER (FIGURE) -->
				<div class="fill box box--dark hero">
					<figure class="cover cover--fade">
						<img :src="slides[0].img" draggable="false" />
						<figcaption>&copy; {{ slides[0].copyright }}</figcaption>
					</figure>
					<article>
						<h1>Title</h1>
						<p class="text--xxl">{{ lorem | truncate(50) }}</p>
					</article>
				</div>

				<hr />

				<!-- CAROUSEL -->
				<carousel class="fill"
					:slides="slides"
					v-slot="{ slide }"
					autoplay
					controls
					pagination>
					<figure class="cover">
						<img :src="slide.item.img" draggable="false" />
						<figcaption>&copy; {{ slide.item.copyright }}</figcaption>
					</figure>
				</carousel>
			</section>

			<!-- COMPONENTS -->
			<section v-if="activeSection === 'components'">
				<div class="bar">
					<h4>Filters</h4>
				</div>
				<div class="bar bar--unfold align-right">
					<label v-for="filter in basicFilters" :key="filter">
						<input type="radio" v-model="basicFilter" :value="filter" />
						<h5>{{ filter }}</h5>
					</label>
					<label>
						<input type="checkbox" v-model="advancedFilter" />
						<h5 data-badge="3"><i class="ri-equalizer-line icon" /></h5>
					</label>
					<div v-if="basicFilter === 'custom'" class="panel">
						<div class="profiles">
							<label v-for="prof in profiles" :key="prof">
								<input type="radio" v-model="profile" :value="prof" />
								<div>
									<img :src="require(`@/assets/vectors/profiles/${prof}.svg`)" />
									<span>{{ prof }}</span>
								</div>
							</label>
						</div>
					</div>
					<div v-if="advancedFilter" class="panel">
						<div class="cols">
							<hr />
							<div class="col col--auto">
								<range-slider
									v-for="(range, i) in ranges"
									:key="i"
									:options="range"
									v-model="range.values"
									title="Range slider" />
							</div>
							<hr />
							<div class="col col--auto">
								<picker
									v-for="(picker, i) in pickers"
									:key="i"
									:options="picker.options"
									v-model="picker.values"
									title="Picker" />
							</div>
							<hr />
						</div>
						<p class="align-center">
							<button class="btn">Clear</button>
						</p>
					</div>
					<div class="panel">
						<div class="scroller scroller--stripe" data-empty="No results found">
							<div v-for="i in 10" :key="i" class="box box--dark">
								<h6>Box {{ i }}</h6>
								<p>{{ lorem }}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

		</div>
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Carousel from '@/components/Carousel.vue';
import Lightbox from '@/components/ModalLightbox.vue';
import RangeSlider from '@/components/form/RangeSlider.vue';
import Picker from '@/components/form/Picker.vue';

const sections = [
	{ name: 'colors', icon: 'ri-pantone-fill' },
	{ name: 'layout', icon: 'ri-layout-fill' },
	{ name: 'typography', icon: 'ri-text' },
	{ name: 'input', icon: 'ri-input-method-line' },
	{ name: 'images', icon: 'ri-image-fill' },
	{ name: 'components', icon: 'ri-stack-fill' },
];

const slides = [
	{
		copyright: 'Pixabay at Pexels',
		img: 'https://images.pexels.com/photos/45900/landscape-scotland-isle-of-skye-old-man-of-storr-45900.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		copyright: 'Pixabay at Pexels',
		img: 'https://images.pexels.com/photos/461956/pexels-photo-461956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		copyright: 'Pixabay at Pexels',
		img: 'https://images.pexels.com/photos/427676/pexels-photo-427676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
];

const profiles = ['FAMILY', 'IGER', 'BBQER', 'CASUAL', 'TREKKER', 'RUNNER', 'SKIER', 'CLIMBER', 'BIKER'];

export default {
	name: 'user-interface',
	components: { Modal, Carousel, Lightbox, RangeSlider, Picker },
	data() {
		return {
			sections,
			activeSection: 'input',
			lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.',
			languages: ['català', 'español', 'français', 'english', 'русский'],
			basicFilters: ['all', 'trending', 'featured', 'custom'],
			basicFilter: 'all',
			advancedFilter: false,
			modal: false,
			lightbox: false,
			slides,
			profiles,
			profile: profiles[0],
			ranges: [
				{ values: [1000, 10000], limits: [1000, 10000], step: 1000, unit: { from: 'm', to: 'km' } },
				{ values: [10, 100], limits: [10, 100], step: 10, unlimited: true },
			],
			pickers: [
				{ values: [], options: profiles },
				{ values: undefined, options: profiles },
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.scroller .box {
	width: 250px;
	margin: 20px 5px;
	transition: all 0.3s ease-in-out;
	z-index: 0;

	&:hover {
		transform: scale(1.05);
		z-index: 1;
	}
}

.profiles {
	text-align: center;

	img {
		height: 70px;
		width: 70px;
		margin: 10px auto;
		display: block;
		opacity: 0.6;
	}

	span {
		display: inline-block;
		padding: 5px 8px;
		font-size: 10px;
	}

	input:checked + * > {
		span {
			background: #000;
			color: #fff;
		}
		img { opacity: 1; }
	}
}
</style>
