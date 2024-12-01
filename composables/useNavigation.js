export function useNavigation() {
	const isDrawerOpen = ref(false);

	const mainNavItems = [
		{
			title: 'Icon Maker',
			description:
				'Design beautiful custom icons for your Touch Portal buttons',
			to: '/tools/iconmaker',
			prependIcon: 'mdi-brush-variant',
		},
		{
			title: 'Pack Builder',
			description: 'Create and manage Touch Portal icon packs with ease',
			to: '/tools/packmaker',
			prependIcon: 'mdi-folder-heart-outline',
		},
	];

	const devNavItems = [
		{
			title: 'Entry Builder',
			description: 'Visual tool to build entry.tp files',
			to: '/plugin/entrybuilder',
			prependIcon: 'mdi-file-code',
		},
		{
			title: 'Entry Format',
			description: 'Format entry.tp files for easy reading',
			to: '/plugin/entryformat',
			prependIcon: 'mdi-format-size',
		},
		{
			title: 'Plugin Bundler',
			description: 'Bundle your plugins for distribution',
			to: '/plugin/bundler',
			prependIcon: 'mdi-package-variant-closed',
		},
		{
			title: 'Plugin Devkits',
			description: 'Community development plugintoolkits',
			to: '/plugin/devkits',
			prependIcon: 'mdi-toolbox',
		},
	];

	const marketNavItems = [
		{
			title: 'Stream Goodies',
			description: 'Download free resources for your streams',
			to: '/goodies',
			prependIcon: 'mdi-gift-outline',
		},
	];

	const toggleDrawer = () => {
		isDrawerOpen.value = !isDrawerOpen.value;
	};

	return {
		isDrawerOpen,
		mainNavItems,
		devNavItems,
		marketNavItems,
		toggleDrawer,
	};
}
