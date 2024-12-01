export function useNavigation() {
	const isDrawerOpen = ref(false);

	const mainNavItems = [
		{
			title: 'Icon Maker',
			description:
				'Design beautiful custom icons for your Touch Portal buttons',
			to: '/iconmaker',
			prependIcon: 'mdi-brush-variant',
		},
		{
			title: 'Pack Builder',
			description: 'Create and manage Touch Portal icon packs with ease',
			to: '/packmaker',
			prependIcon: 'mdi-folder-heart-outline',
		},
	];

	const devNavItems = [];

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
