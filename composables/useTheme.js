export function useTheme() {
	const theme = ref(localStorage.getItem('theme') || 'dark');
	const themeIcon = computed(() =>
		theme.value === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'
	);

	const toggleTheme = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme.value);
	};

	return { theme, themeIcon, toggleTheme };
}
