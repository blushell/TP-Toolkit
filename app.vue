<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `TP TOOLKIT - ${titleChunk}` : 'TP TOOLKIT';
	},
});
</script>
<style>
html,
body {
	overflow: auto;
}
</style>
