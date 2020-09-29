import base from './safety/base';
import gear from './safety/gear';
import rescue from './safety/rescue';
import wildlife from './safety/wildlife';
import hypothermia from './safety/hypothermia';
import thunderstorm from './safety/thunderstorm';

export default {

	prevention: 'prevenció',
	treatment: 'tractament',

	sections: {
		base: 'seguretat',
		gear: 'equipament',
		rescue: 'rescat',
		wildlife: 'espècies perilloses',
		thunderstorm: 'tempestes',
		hypothermia: 'hipotèrmia',
	},

	base,
	gear,
	rescue,
	wildlife,
	hypothermia,
	thunderstorm,
};
