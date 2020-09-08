export default {
	inserted(el) {
		el.dX = 0;

		el.scroll = ({ movementX }) => {
			const max = el.clientWidth - el.children[0].scrollWidth - el.children[0].offsetLeft;
			el.dX = Math.max(max, Math.min(el.dX + movementX, 0));
			el.children[0].style.transform = `translateX(${el.dX}px)`;
			el.isScroll = true;
		};

		el.finish = () => {
			el.removeEventListener('mousemove', el.scroll);
			el.removeEventListener('mouseleave', el.finish);
		};

		el.addEventListener('mousedown', () => {
			el.addEventListener('mousemove', el.scroll);
			el.addEventListener('mouseleave', el.finish);
			el.isScroll = false;
		});

		el.addEventListener('mouseup', el.finish, true);

		el.addEventListener('click', (event) => {
			if (el.isScroll) event.stopImmediatePropagation();
		}, true);
	},
};
