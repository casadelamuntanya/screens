export default {
	/* eslint-disable no-param-reassign */
	inserted(el, binding) {
		el.swipe = ({ pageX, pageY }) => {
			const { offsetWidth, offsetHeight } = el;
			const { left, top } = el.getBoundingClientRect();
			const absolute = { x: pageX - left, y: pageY - top };
			const percent = {
				x: absolute.x * 100 / offsetWidth,
				y: absolute.y * 100 / offsetHeight,
			};
			binding.value({ absolute, percent });
		};

		el.addEventListener('mousedown', () => {
			el.addEventListener('mousemove', el.swipe, true);
		}, true);

		el.addEventListener('mouseup', () => {
			el.removeEventListener('mousemove', el.swipe, true);
		}, true);
	},
};
