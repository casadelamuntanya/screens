/**
 * MAP INJECTION MIXIN
 * Provide a computed property referencing the parent's map object
 */
export default {
	inject: ['injectMap', 'parent'],
	computed: {
		map() {
			return this.injectMap();
		},
	},
};
