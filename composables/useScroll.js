export function useScroll() {
	const showScrollButton = ref(false);
	const SCROLL_DURATION = 400;

	const scrollToTop = () => {
		const startPosition = window.scrollY;
		const startTime = performance.now();

		const animateScroll = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / SCROLL_DURATION, 1);

			window.scrollTo(0, startPosition * (1 - progress));

			if (progress < 1) {
				requestAnimationFrame(animateScroll);
			}
		};

		requestAnimationFrame(animateScroll);
	};

	const handleScroll = () => {
		showScrollButton.value = window.scrollY > 100;
	};

	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', handleScroll);
	});

	return { showScrollButton, scrollToTop };
}
