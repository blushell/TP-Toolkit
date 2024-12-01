export function useTheme() {
	const theme = ref('dark');
	const themeIcon = computed(() =>
		theme.value === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'
	);

	const toggleTheme = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
	};

	return { theme, themeIcon, toggleTheme };
}
