export function useNavigation() {
	const isDrawerOpen = ref(false);

	const mainNavItems = [];

	const devNavItems = [];

	const marketNavItems = [];

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
