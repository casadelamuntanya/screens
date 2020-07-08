function emit(name, component, event = {}) {
	const { map } = component;
	component.$emit(name, {
		...event,
		zoom: map.getZoom(),
		center: map.getCenter(),
		bounds: map.getBounds(),
	});
}

const events = {
	unload: component => event => emit('remove', component, event),
	click: component => mouseEvent => emit('click', component, mouseEvent),
	resize: component => resizeEvent => emit('resize', component, resizeEvent),
	viewreset: component => event => emit('reset', component, event),
	zoomstart: component => event => emit('zoomstart', component, event),
	zoomend: component => event => emit('zoomend', component, event),
	zoom: component => event => emit('zoom', component, event),
	zoomlevelschange: component => event => emit('zoomchange', component, event),
	movestart: component => event => emit('movestart', component, event),

	moveend: component => (event) => {
		const { map } = component;
		emit('moveend', component, event);
		if (map.isFlying) map.fire('flyend', { ...event, type: 'flyend' });
	},

	move: component => (event) => {
		const { map } = component;
		emit('move', component, event);
		if (map.isFlying) emit('fly', component, { ...event, type: 'fly' });
	},

	flystart: component => () => {
		const { map } = component;
		map.isFlying = true;
		emit('flystart', component, {
			type: 'flystart',
			target: map,
			sourceTarget: map,
		});
	},

	flyend: component => (event) => {
		const { map } = component;
		map.isFlying = false;
		emit('flyend', component, event);
	},
};

export function bindAllMapEvents(component) {
	const { map } = component;
	Object.entries(events).forEach(([event, handler]) => map.on(event, handler(component)));
}

export default events;
