import L from 'leaflet';

/* eslint-disable import/no-extraneous-dependencies */
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { min, max, bisector } from 'd3-array';
import { line } from 'd3-shape';
import { select, mouse } from 'd3-selection';

/* eslint-disable no-underscore-dangle */
L.Control.Elevation = L.Control.extend({
	PADDING: 25,
	options: {
		position: 'bottomleft',
		width: 500,
		buffer: 0,
		marker: null,
	},

	initialize(options) {
		L.Util.setOptions(this, options);
	},

	onAdd(map) {
		const { marker } = this.options;
		this._container = L.DomUtil.create('div', 'leaflet-elevation', map._controlContainer);

		if (marker) {
			const icon = L.divIcon({ className: 'leaflet-elevation__map-marker' });
			this._marker = L.marker([0, 0], { icon }).addTo(map);
		}

		map.on('trail:add', this._addTrail, this);
		map.on('trail:remove', this._clear, this);

		return this._container;
	},

	// Triggered at new trail event & calculate trail's parameters
	_addTrail({ coordinates }) {
		this._clear();

		// Calculate accumulated distance for points and round altitude
		this._data = coordinates.reduce((acc, coordinate) => {
			const prev = acc[acc.length - 1];
			const distance = prev
				? prev.distance + prev.coordinate.distanceTo(coordinate)
				: 0;
			acc.push({ distance, coordinate });
			return acc;
		}, []);

		// Get path limits
		this._distance = this._data[this._data.length - 1].distance;
		this._altitude = {
			min: min(this._data, point => point.coordinate.alt),
			max: max(this._data, point => point.coordinate.alt),
		};

		this._plot();
	},

	// Plot the elevation chart
	_plot() {
		const { width, buffer } = this.options;
		const drop = this._altitude.max - this._altitude.min;
		const height = Math.max(25, drop * (width / this._distance));
		const ticksX = 5;
		const ticksY = Math.max(2, Math.round(height / 30));

		this._plotX = scaleLinear()
			.domain([0, this._distance])
			.range([0, width]);

		this._plotY = scaleLinear()
			.domain([this._altitude.min - buffer, this._altitude.max + buffer])
			.range([height, 0]);

		const axisX = axisBottom(this._plotX)
			.ticks(ticksX)
			.tickFormat(value => `${value / 1000} km`);

		const axisY = axisLeft(this._plotY)
			.ticks(ticksY)
			.tickSize(-width)
			.tickFormat(value => `${value}m`);

		const plotLine = line()
			.x(point => this._plotX(point.distance))
			.y(point => this._plotY(point.coordinate.alt));

		const container = select(this._container)
			.append('svg')
			.attr('class', 'leaflet-elevation__wrapper')
			.attr('width', width + 2 * this.PADDING)
			.attr('height', height + 2 * this.PADDING)
			.style('pointer-events', 'all')
			.on('mousemove', this._onMove.bind(this))
			.on('mouseout', this._onOut.bind(this));

		const chart = container.append('g')
			.attr('transform', `translate(${this.PADDING}, ${this.PADDING})`);

		// Axis
		chart.append('g')
			.attr('class', 'leaflet-elevation__axis leaflet-elevation__axis--x')
			.attr('transform', `translate(0, ${height})`)
			.call(axisX);

		chart.append('g')
			.attr('class', 'leaflet-elevation__axis leaflet-elevation__axis--y')
			.call(axisY);

		// Plot
		chart.append('path')
			.datum(this._data)
			.attr('class', 'leaflet-elevation__line')
			.attr('d', plotLine);

		const marker = chart.append('g')
			.attr('class', 'leaflet-elevation-marker')
			.attr('visibility', 'hidden');

		marker.append('circle')
			.attr('class', 'leaflet-elevation-marker__point')
			.attr('r', 5);

		marker.append('text')
			.attr('class', 'leaflet-elevation-marker__label')
			.attr('text-anchor', 'middle')
			.attr('x', 0)
			.attr('y', 0);
	},

	_onMove() {
		const bisect = bisector(point => point.distance).left;
		const [cursorX] = mouse(this._container);
		const chartCursorX = this._plotX.invert(cursorX - this.PADDING);
		const point = this._data[bisect(this._data, chartCursorX, 1)];

		if (!point) return;
		const x = this._plotX(point.distance);
		const y = this._plotY(point.coordinate.alt);
		const chart = select(this._container);
		chart.selectAll('.leaflet-elevation-marker')
			.attr('visibility', 'visible');
		chart.selectAll('.leaflet-elevation-marker__point')
			.attr('cx', x)
			.attr('cy', y);
		chart.selectAll('.leaflet-elevation-marker__label')
			.html(`${point.coordinate.alt}m`)
			.attr('x', x)
			.attr('y', y - 15);

		if (this._marker) {
			this._marker.setLatLng(point.coordinate).addTo(this._map);
			if (this.options.marker?.centerOnHover) this._map.panTo(point.coordinate);
		}
	},

	_onOut() {
		if (!this.options.marker?.persist) this._marker.remove();
	},

	_clear() {
		select(this._container).selectAll('*').remove();
	},

	onRemove(map) {
		this._clear();
		map.off('trail:add', this._addTrail);
		map.off('trail:remove', this._clear);
	},
});

L.control.elevation = options => new L.Control.Elevation(options);
