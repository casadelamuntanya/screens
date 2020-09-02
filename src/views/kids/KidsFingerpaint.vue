<template>
	<section id="page-kids-draw" class="kids">
		<div class="fingerpaint">
			<p>
				<button class="btn btn--alert" @click="$router.go(-1)">
					<i class="ri-arrow-left-line icon"></i>
					<span>{{ $t('kids.games.exit') }}</span>
				</button>
			</p>
			<fieldset class="fingerpaint__drawings">
				<legend align="center">{{ $t('kids.games.fingerpaint.drawing') }}</legend>
				<label v-for="drawing in drawings" :key="drawing">
					<input type="radio" v-model="canvasDrawing" :value="drawing">
					<img :src="`/assets/images/kids/coloring/${drawing}.png`">
				</label>
			</fieldset>
			<div class="fingerpaint__board">
				<canvas ref="drawboard" :width="canvas.width" :height="canvas.height" />
				<img
					v-if="canvasDrawing"
					:src="`/assets/images/kids/coloring/${canvasDrawing}.png`">
			</div>
			<fieldset class="fingerpaint__color">
				<legend align="center">{{ $t('kids.games.fingerpaint.color') }}</legend>
				<label v-for="color in colors" :key="color">
					<input type="radio" v-model="cursorColor" :value="color">
					<span :style="`--color:${color}`" />
				</label>
			</fieldset>
			<fieldset class="fingerpaint__size">
				<legend align="center">{{ $t('kids.games.fingerpaint.size') }}</legend>
				<label v-for="size in sizes" :key="size">
					<input type="radio" v-model="cursorSize" :value="size">
					<span :style="`--size:${size}px; --color:${cursorColor}`" />
				</label>
			</fieldset>
		</div>
	</section>
</template>

<script>
import { draw } from '@/config/kids';

const { drawings, colors, sizes } = draw;

export default {
	name: 'KidsFingerpaint',
	data() {
		return {
			canvas: {
				width: undefined,
				height: undefined,
				isDrawing: false,
				pointer: { x: 0, y: 0 },
			},
			drawings,
			canvasDrawing: drawings[0],
			colors,
			cursorColor: colors[0],
			sizes,
			cursorSize: sizes[0],
		};
	},
	watch: {
		canvasDrawing() {
			this.clear();
		},
	},
	methods: {
		drawLine(prev, current) {
			const context = this.$refs.drawboard.getContext('2d');
			context.beginPath();
			context.strokeStyle = this.cursorColor;
			context.lineWidth = this.cursorSize;
			context.lineJoin = 'round';
			context.moveTo(prev.x, prev.y);
			context.lineTo(current.x, current.y);
			context.closePath();
			context.stroke();
		},
		clear() {
			const context = this.$refs.drawboard.getContext('2d');
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		},
	},
	mounted() {
		const { drawboard } = this.$refs;
		this.canvas.width = drawboard.offsetWidth;
		this.canvas.height = drawboard.offsetHeight;

		drawboard.addEventListener('mousedown', ({ offsetX: x, offsetY: y }) => {
			this.canvas.pointer = { x, y };
			this.canvas.isDrawing = true;
		});

		drawboard.addEventListener('mousemove', ({ offsetX: x, offsetY: y }) => {
			if (this.canvas.isDrawing === true) {
				this.drawLine(this.canvas.pointer, { x, y });
				this.canvas.pointer = { x, y };
			}
		});

		drawboard.addEventListener('mouseup', () => { this.canvas.isDrawing = false; });
	},
};
</script>

<style lang="scss" scoped>
#page-kids-draw { height: 100%; }

.fingerpaint {
	height: 100%;
	display: flex;
	flex-direction: column;

	&__board {
		flex: 1;
		position: relative;

		canvas {
			height: 100%;
			width: 100%;
		}

		img {
			position: absolute;
			max-height: 100%;
			max-width: 100%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	fieldset {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		background: #f8f8f8;
		padding: 30px 0 40px;
		border-radius: 10px;
		border: 1px solid #d0d0d0;
		margin-top: 25px;

		legend {
			font-weight: bold;
			padding: 0 5px;
			font-size: 1.2em;
			text-transform: uppercase;
		}
	}

	&__drawings {
		label { margin: 0 20px; }

		img {
			background: #fff;
			padding: 10px;
			border: 1px solid #d0d0d0;
			border-radius: 10px;
			height: 100px;
		}
	}

	&__color {
		label { margin: 0 10px; }

		span {
			--color: #000;

			display: block;
			height: 40px;
			width: 40px;
			border-radius: 50%;
			background: var(--color);
			position: relative;
			border: 1px solid #d0d0d0;
		}
	}

	&__size {
		span {
			--size: 10px;
			--color: #000;

			display: block;
			position: relative;
			height: var(--size);
			// width: var(--size);
			width: 120px;
			border-radius: var(--size);
			background: var(--color);
			border: 1px solid #d0d0d0;
		}
	}

	&__drawings input:checked + img,
	&__color input:checked + span,
	&__size input:checked + span {
		border-color: transparent;
		box-shadow: 0 0 0 12px #e0e0e0;
	}
}
</style>
