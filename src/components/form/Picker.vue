<template lang="html">
	<fieldset class="picker">
		<legend class="picker__title">{{ title }}</legend>
		<ul class="picker__options" :style="`column-count:${columns}`">
			<li v-for="option in options" :key="option" class="picker__option">
				<label>
					<input :type="inputType" v-model="selected" :value="option" />
					<span class="picker__label">
						<slot :option="option">{{ option }}</slot>
					</span>
				</label>
			</li>
		</ul>
	</fieldset>
</template>

<script>
export default {
	name: 'picker',
	props: {
		title: { type: String, default: '' },
		value: { required: true },
		options: { type: Array, required: true },
		columns: { type: Number, default: 3 },
		multiple: { type: Boolean, default: false },
	},
	data() {
		return { selected: this.value || (this.multiple ? [] : undefined) };
	},
	computed: {
		inputType() {
			return this.multiple || Array.isArray(this.value) ? 'checkbox' : 'radio';
		},
	},
	watch: {
		value(value) { this.selected = value; },
		selected(value) { this.$emit('input', value); },
	},
};
</script>
