export const useSnackbar = () => {
	const snackbar = ref({
		show: false,
		text: '',
		color: 'success',
	});

	const showSnackbar = (text, color = 'success', timeout = 5000) => {
		snackbar.value = { show: true, text, color };
		setTimeout(() => {
			snackbar.value.show = false;
		}, timeout);
	};

	return { snackbar, showSnackbar };
};
