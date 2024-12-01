import { defineNuxtPlugin } from 'nuxt/app';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components: {
			...components,
			...labsComponents,
		},
		directives,
		theme: {
			defaultTheme: 'dark',
		},
	});

	nuxtApp.vueApp.use(vuetify);
});
