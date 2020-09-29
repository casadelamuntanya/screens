export default {
	inserted(el, binding) {
		el.scrollX = 0;

		el.scroll = ({ movementX }) => {
			const { arg = 5 } = binding;
			const max = el.clientWidth - el.children[0].scrollWidth - el.children[0].offsetLeft;
			el.dX += movementX;
			el.scrollX = Math.max(max, Math.min(el.scrollX + movementX, 0));
			el.children[0].style.transform = `translateX(${el.scrollX}px)`;
			if (Math.abs(el.dX) > arg) el.isScroll = true;
		};

		el.finish = () => {
			el.removeEventListener('mousemove', el.scroll);
			el.removeEventListener('mouseleave', el.finish);
		};

		el.addEventListener('mousedown', () => {
			el.addEventListener('mousemove', el.scroll);
			el.addEventListener('mouseleave', el.finish);
			el.dX = 0;
			el.isScroll = false;
		});

		el.addEventListener('mouseup', el.finish, true);

		el.addEventListener('click', (event) => {
			if (el.isScroll) event.stopImmediatePropagation();
		}, true);
	},

	update(el) {
		el.scroll({ movementX: -el.scrollX });
	},
};
