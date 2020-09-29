import L from 'leaflet';
import './control.leaflet-compare.css';

const asArray = item => (Array.isArray(item) ? item : [item]);
const constrain = (number, min, max) => Math.min(max, Math.max(min, number));

/* eslint-disable no-underscore-dangle */
L.Control.Compare = L.Control.extend({

	options: {
		position: 'topleft',
		thumbPosition: '50%',
		orientation: 'horizontal',
	},


	initialize(beforeLayers, afterLayers, options) {
		L.Util.setOptions(this, options);

		this._beforeLayers = asArray(beforeLayers);
		this._afterLayers = asArray(afterLayers);
		this._beforeLayer = this._beforeLayers[this._beforeLayers.length - 1];
		this._afterLayer = this._afterLayers[this._afterLayers.length - 1];

		this._horizontal = this.options.orientation === 'horizontal';
	},


	onAdd(map) {
		const { orientation, thumbPosition } = this.options;
		this._map = map;
		this._compare = L.DomUtil.create('div', 'leaflet-compare', map._controlContainer);
		this._divider = L.DomUtil.create('div', `leaflet-compare-div-${orientation}`, this._compare);
		this._thumb = L.DomUtil.create('div', 'leaflet-compare-thumb', this._divider);

		L.DomEvent.on(this._compare, 'mousedown', this._onDown, this);
		L.DomEvent.on(this._compare, 'touchstart', this._onDown, this);

		this._map.on('move', this._update, this);
		this._map.on('resize', this._onResize, this);
		this._map.on('layeradd layerremove', this._changeLayers, this);

		this._setthumbPosition(thumbPosition);
		this._update();

		return this;
	},


	_changeLayers() {
		this._beforeLayers.forEach((layer) => {
			if (this._map.hasLayer(layer)) this._beforeLayer = layer;
		});
		this._afterLayers.forEach((layer) => {
			if (this._map.hasLayer(layer)) this._afterLayer = layer;
		});
		this._update();
	},


	_update() {
		if (!this._map) return this;

		const mapSize = this._map.getSize();
		const nw = this._map.containerPointToLayerPoint([0, 0]);
		const se = this._map.containerPointToLayerPoint(mapSize);

		const clip = (this._horizontal ? nw.x : nw.y) + this._thumbPosition;
		const beforeClip = this._horizontal
			? `rect(${[nw.y, clip, se.y, nw.x].join('px,')}px)`
			: `rect(${[nw.y, se.x, clip, nw.x].join('px,')}px)`;
		const afterClip = this._horizontal
			? `rect(${[nw.y, se.x, se.y, clip].join('px,')}px)`
			: `rect(${[clip, se.x, se.y, nw.x].join('px,')}px)`;

		if (this._beforeLayer) this._beforeLayer.getContainer().style.clip = beforeClip;
		if (this._afterLayer) this._afterLayer.getContainer().style.clip = afterClip;
		this._divider.style[this._horizontal ? 'left' : 'top'] = `${this._thumbPosition}px`;

		return this;
	},


	_setthumbPosition(thumbPosition) {
		const { width, height } = this._compare.getBoundingClientRect();
		const mapSize = this._map.getSize();
		const maxSize = this._horizontal ? mapSize.x : mapSize.y;

		const pos = typeof thumbPosition === 'string' && thumbPosition.includes('%')
			? (parseFloat(thumbPosition) * maxSize) / 100
			: thumbPosition;

		this._thumbPosition = constrain(Math.round(pos), 0, this._horizontal ? width : height);
		const isStart = this._thumbPosition === 0;
		const isEnd = this._horizontal
			? this._thumbPosition === width
			: this._thumbPosition === height;
		if (isStart || isEnd) this._divider.classList.add('leaflet-compare-div-end');
		else this._divider.classList.remove('leaflet-compare-div-end');

		this._update();
	},


	_onDown(event) {
		if (event.target !== this._thumb) return;
		if (event.touches) {
			L.DomEvent.on(this._compare, 'touchmove', this._onDrag, this);
			L.DomEvent.on(this._compare, 'touchend', this._onUp, this);
		} else {
			L.DomEvent.on(this._compare, 'mousemove', this._onDrag, this);
			L.DomEvent.on(this._compare, 'mouseup', this._onUp, this);
			L.DomEvent.on(this._compare, 'mouseleave', this._onUp, this);
		}
		this._map.dragging.disable();
	},


	_onDrag(event) {
		const e = event.touches ? event.touches[0] : event;
		const { left, top } = this._compare.getBoundingClientRect();
		const thumbPosition = this._horizontal ? e.clientX - left : e.clientY - top;
		this._setthumbPosition(thumbPosition);
	},


	_onUp() {
		L.DomEvent.off(this._compare, 'mousemove', this._onDrag, this);
		L.DomEvent.off(this._compare, 'mouseup', this._onUp, this);
		L.DomEvent.off(this._compare, 'mouseout', this._onUp, this);
		L.DomEvent.off(this._compare, 'touchmove', this._onDrag, this);
		L.DomEvent.off(this._compare, 'touchend', this._onDrag, this);
		this._map.dragging.enable();
	},

	_onResize() {
		this._setthumbPosition(this._thumbPosition);
	},


	onRemove() {
		this._map.off('move', this._updateClip, this);
		L.DomEvent.off(this._compare, 'mousedown', this._onDown, this);
		L.DomEvent.off(this._compare, 'touchstart', this._onDown, this);
	},
});

L.control.compare = (layers, compare, opts) => new L.Control.Compare(layers, compare, opts);
