<template lang="html">
	<fieldset class="picker">
		<legend class="picker__legend picker__title">
			{{ $t(`${namespace}.attributes.${picker.attr}`) }}
		</legend>
		<div class="picker__options" :style="`column-count:${columns}`">
			<label v-for="option in picker.options" :key="option" class="picker__option">
				<input type="checkbox" v-model="picker.values" :value="option" />
				<span class="picker__label">
					{{ $t(`${namespace}.${picker.attr}.${option}`) }}
				</span>
			</label>
		</div>
	</fieldset>
</template>

<script>
const required = ['attr', 'values', 'options'];
const hasAllKeys = obj => required.every(key => Object.keys(obj).includes(key));

export default {
	name: 'picker',
	props: {
		namespace: { type: String, required: true },
		picker: { type: Object, required: true, validator: hasAllKeys },
		columns: { type: Number, default: 2 },
	},
};
</script>
