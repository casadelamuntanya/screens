export default {
	/* eslint-disable no-param-reassign */
	inserted(el, binding) {
		el.observer = new ResizeObserver((entries) => {
			entries.forEach(entry => binding.value(entry.target, entry.contentRect));
		});
		el.observer.observe(el);
	},
};
