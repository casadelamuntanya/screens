export default {
	trails: {
		attributes: {
			distance: 'distància',
			duration: 'durada',
			drop_positive: 'desnivell +',
			wildlife: 'fauna',
			flora: 'flora',
			culture: 'patrimoni cultural',
		},

		wildlife: {
			MARMOTA: 'marmota',
			RUPICABRA: 'isard',
			CAPREOLUS: 'cabirol',
			OVIS_MUSIMON: 'mufló',
			TETRAO: 'gall fer',
			LAGOPUS: 'perdiu blanca',
			SALMO_TRUTTA: 'truita',
			TRITURUS: 'tritó',
			LACERTA: 'serenalla',
			ATHENE_NOCTUA: 'mussol',
			LUTRINAE: 'llúdriga',
		},

		flora: {
			NARCISSUS_POETICUS: 'grandalla',
			SINGULAR_TREE: 'arbre singular',
		},

		culture: {
			DRY_STONE: 'pedra seca',
			ART: 'art',
			ROMANESQUE: 'romànic',
		},
	},

	card: {
		do_it_now: 'Fes-lo ara!',
		distance: {
			name: '@:explore.trails.attributes.distance',
			unit: 'kilòmetres',
		},
		duration: {
			name: '@:explore.trails.attributes.duration',
			unit: 'hores',
		},
		drop_positive: {
			name: '@:explore.trails.attributes.drop_positive',
			unit: 'metres',
		},
	},

	filters: {
		all: 'Tot',
		featured: 'Destacat',
		customized: 'Personalitzat',
	},

	profiles: {
		CASUAL: 'Casual',
		TREKKER: 'Excursionista',
		FAMILY: 'Familia',
		IGER: 'Instagramer',
		RUNNER: 'Corredor',
	},

	disclaimer: "No es garanteix l'avistament de cap espècie.",
};
