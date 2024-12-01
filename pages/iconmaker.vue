<template>
	<div>
		<h1>Coming Soon! 🎉</h1>
	</div>
</template>

<script setup>
useHead({ title: `Icon Maker` });
definePageMeta({ title: 'Icon Generator' });

import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

onMounted(() => {
	launchConfetti(); // Call the function directly
});

function launchConfetti() {
	confetti({
		/* particleCount: 7, */
		angle: 60,
		spread: 55,
		origin: { x: 0.58, y: 0.44 },
	});
}
</script>
<style scoped>
h1 {
	text-align: center;
	font-size: 3em; /* Increased font size */
	display: flex;
	justify-content: center;
	align-items: center;
	height: 75vh; /* Full viewport height */
}
</style>
