<template>
	<section id="page-kids-memorama" class="kids">
		<div class="memorama">
			<!-- Select level -->
			<div v-if="!pairs">
				<h3>{{ $t('kids.games.levels.choose_level') }}</h3>
				<p>
					<button class="btn" @click="init(3)">
						{{ $t('kids.games.levels.beginner') }}
					</button>
					<button class="btn" @click="init(5)">
						{{ $t('kids.games.levels.advanced') }}
					</button>
					<button class="btn" @click="init(7)">
						{{ $t('kids.games.levels.expert') }}
					</button>
				</p>
				<p>
					<button class="btn btn--alert" @click="$router.go(-1)">
						<i class="ri-arrow-left-line icon"></i>
						<span>{{ $t('kids.games.exit') }}</span>
					</button>
				</p>
			</div>

			<!-- Play -->
			<div v-else>
				<transition-group tag="ul" name="cards" class="memorama__cards">
					<li
						v-for="(card, i) in cards"
						:key="`${card.id}`"
						:style="`--delay:${i * 50}ms;`">
						<div
							:class="cardClass(card)"
							:style="`--tilt:${card.tilt}deg`"
							@click="flip(i)">
							<div class="memorama-card__front">
								<img :src="`/assets/images/kids/animals/${card.type}.svg`">
								{{ $t(`kids.games.memorama.cards.${card.type}`) }}
							</div>
							<div class="memorama-card__back">
								<img svg-inline src="@/assets/vectors/logos/cdm.svg">
							</div>
						</div>
					</li>
				</transition-group>
				<p>
					<button class="btn" @click="init(pairs)">
						{{ $t('kids.games.restart') }}
					</button>
					<button class="btn btn--alert" @click="close">
						<i class="ri-arrow-left-line icon"></i>
						<span>{{ $t('kids.games.exit') }}</span>
					</button>
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import { memorama } from '@/config/kids';

const { cards, TILT_MIN, TILT_MAX, FLIP_WAIT_TIME } = memorama;

const shuffle = arr => arr
	.map(item => ({ sort: Math.random(), item }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ item }) => item);

/* eslint-disable no-param-reassign */
export default {
	name: 'KidsMemorama',
	data() {
		return {
			pairs: undefined,
			wait: false,
			cards: [],
			movements: 0,
		};
	},
	computed: {
		isFinished() {
			return this.cards.filter(card => card.isFound).length === this.cards.length;
		},
	},
	methods: {
		init(pairs = 2) {
			this.attempts = 0;
			this.pairs = pairs;
			const allCards = shuffle(cards).slice(0, pairs).flatMap(card => Array(2).fill(card));
			this.cards = allCards.map((type, id) => {
				const tilt = Math.round(Math.random() * (TILT_MAX - TILT_MIN) + TILT_MIN);
				return { id, type, isFlipped: false, isFound: false, tilt };
			});
			this.cards = shuffle(this.cards);
		},
		close() {
			this.cards = [];
			this.pairs = undefined;
		},
		cardClass(card) {
			return ['memorama-card', {
				'is-flipped': card.isFlipped,
				'is-found': card.isFound,
			}];
		},
		flip(i) {
			if (this.wait) return;
			this.cards[i].isFlipped = true;
			const flipped = this.cards.filter(card => card.isFlipped && !card.isFound);
			if (flipped.length === 2) {
				this.movements += 1;
				const match = flipped.every(card => card.type === this.cards[i].type);
				if (match) flipped.forEach((card) => { card.isFound = true; });
				else {
					this.wait = true;
					setTimeout(() => {
						flipped.forEach((card) => { card.isFlipped = false; });
						this.wait = false;
					}, FLIP_WAIT_TIME);
				}
			}
		},
		reset() {
			this.cards.forEach((card) => {
				card.isFlipped = false;
				card.isFound = false;
			});
		},
	},
};
</script>

<style lang="scss">
@import url('/assets/fonts/omiwa.css');

#page-kids-memorama { height: 100%; }

.memorama {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	&__cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 100px 0;

		li {
			flex: 0 0 content;
			display: inline-block;
			margin: 30px;
			perspective: 1000px;

			&:nth-child(4n) { page-break-after: always; }
		}
	}

	&-card {
		--tilt: 5deg;

		height: 200px;
		width: 150px;
		transform: rotateY(180deg) rotateZ(var(--tilt));
		transform-style: preserve-3d;
		transition: all 0.8s ease;
		border-radius: 10px;

		&__front,
		&__back {
			backface-visibility: hidden;
			box-sizing: border-box;
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			background: #fff;
			border-radius: 15px;
			border: 7px solid #fff;
			box-shadow: 0 10px 20px 5px rgba(#000, 0.2);
			font-family: 'omiwa', 'Arial', sans-serif !important;
			font-size: 23px;
		}

		&__front img {
			height: 120px;
			width: 100px;
			margin-bottom: 15px;
		}

		&__back {
			background: linear-gradient(315deg, #000 35%, #24262c 100%);
			color: #fff;
			transform: rotateY(180deg);

			svg { height: 50px; }
		}

		&.is-flipped { transform: rotateY(0) rotateZ(calc(-1 * var(--tilt))); }
		&.is-found &__front { opacity: 0.5; }
	}
}

.cards-move { transition: all 1s ease; }
</style>
