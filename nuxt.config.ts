// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	ssr: false,
	build: {
		analyze: true,
		transpile: ['vuetify'],
	},
	css: [
		'@/assets/css/global.css',
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css',
	],
	/* nitro: {
		static: true,
	}, */
	app: {
		baseURL: '/tp-toolkit/',
		head: {
			title: 'Touch Portal Toolkit',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
				{ name: 'description', content: 'Touch Portal Toolkit' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				/* {
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
				}, */
			],
		},
	},
});
