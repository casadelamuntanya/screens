import base from './safety/base';
import gear from './safety/gear';
import rescue from './safety/rescue';
import wildlife from './safety/wildlife';
import thunderstorm from './safety/thunderstorm';

export default {
	sections: {
		base: 'seguretat',
		gear: 'equipament',
		rescue: 'rescat',
		wildlife: 'espècies',
		thunderstorm: 'tempestes',
	},

	base,
	gear,
	rescue,
	wildlife,
	thunderstorm,
};
