/* eslint-disable no-param-reassign */

export const requestInterceptor = (config) => {
	// Inject Airtable API key on every request
	const apiKey = process.env.VUE_APP_AIRTABLE_KEY;
	config.headers.Authorization = `Bearer ${apiKey}`;

	// Add locale tail to localized fields
	const { fields, localeFields, locale } = config.params || {};
	if (localeFields) {
		config.params.fields = fields.map(field => (
			localeFields.includes(field)
				? `${field}__${locale}`
				: field
		));
	}
	return config;
};


export const responseInterceptor = (response) => {
	const { data, config } = response;
	const { localeFields, locale } = config.params || {};
	// Format default Airtable response to a flat array of objects
	return data.records.map(({ id, fields }) => {
		// Remove locale trail to localized fields
		if (localeFields) {
			localeFields.forEach((field) => {
				fields[field] = fields[`${field}__${locale}`];
				delete fields[`${field}__${locale}`];
			});
		}
		return { _id: id, ...fields };
	});
};
