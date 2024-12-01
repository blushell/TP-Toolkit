export function useNavigation() {
	const isDrawerOpen = ref(false);

	const mainNavItems = [];

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
