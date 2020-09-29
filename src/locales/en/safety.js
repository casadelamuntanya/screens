import base from './safety/base';
import rescue from './safety/rescue';
import thunderstorm from './safety/thunderstorm';
import hypothermia from './safety/hypothermia';
import wildlife from './safety/wildlife';
import gear from './safety/gear';

export default {

	prevention: 'prevention',
	treatment: 'treatment',

	sections: {
		base: 'safety',
		gear: 'equipment',
		rescue: 'rescue',
		wildlife: 'dangerous species',
		thunderstorm: 'thunderstorm',
		hypothermia: 'hypothermia',
	},

	base,
	rescue,
	hypothermia,
	wildlife,
	gear,
	thunderstorm,
};
