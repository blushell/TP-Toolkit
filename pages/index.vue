<template>
	<v-container fluid>
		<div class="text-center mb-4 pb-1">
			<h1 class="title">TP Toolkit</h1>
			<p class="text-subtitle-1">
				Essential tools made for Touch Portal plugin development and content
				creation
			</p>
		</div>

		<div class="sections my-8">
			<!-- Creation Tools Section -->
			<section class="mb-16">
				<!-- <div class="mb-7">
					<v-divider style="width: 50%"><h2>Creation Tools</h2></v-divider>
				</div> -->
				<div class="tools-grid">
					<v-card v-for="item in mainNavItems" :key="item.to" :to="item.to">
						<v-icon :icon="item.prependIcon" class="card-icon"></v-icon>
						<div class="card-content">
							<h3>{{ item.title }}</h3>
							<p>{{ item.description }}</p>
						</div>
						<v-icon icon="mdi-chevron-right" class="card-arrow"></v-icon>
					</v-card>
				</div>
			</section>

			<!-- Plugin Tools Section -->
			<section class="mb-16">
				<div class="mb-7">
					<v-divider><h2>Plugin Development</h2></v-divider>
				</div>
				<div class="tools-grid">
					<v-card
						v-for="item in filteredDevNavItems"
						:key="item.to"
						:to="item.to"
					>
						<v-icon :icon="item.prependIcon" class="card-icon"></v-icon>
						<div class="card-content">
							<h3>{{ item.title }}</h3>
							<p>{{ item.description }}</p>
						</div>
						<v-icon icon="mdi-chevron-right" class="card-arrow"></v-icon>
					</v-card>
				</div>
			</section>

			<!-- Goodies Section -->
			<section>
				<div class="mb-7">
					<v-divider><h2>Extra Goodies</h2></v-divider>
				</div>
				<div class="tools-grid">
					<v-card v-for="item in marketNavItems" :key="item.to" :to="item.to">
						<v-icon :icon="item.prependIcon" class="card-icon"></v-icon>
						<div class="card-content">
							<h3>{{ item.title }}</h3>
							<p>{{ item.description }}</p>
						</div>
						<v-icon icon="mdi-chevron-right" class="card-arrow"></v-icon>
					</v-card>
				</div>
			</section>
		</div>
	</v-container>
</template>
<script setup>
useHead({ title: `Home` });
definePageMeta({ title: 'TP Toolkit' });
const { mainNavItems, devNavItems, marketNavItems } = useNavigation();

// Filter out devkits from devNavItems
const filteredDevNavItems = devNavItems.filter((item) => !item.isLink);
</script>

<style scoped>
.title {
	font-size: 3rem;
	background-image: linear-gradient(12deg, #00c6ff, #001f5c);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	font-weight: 700;
}

h2 {
	font-size: 1.8rem;
}

.tools-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 1.5rem;
	max-width: 80%;
	margin: 0 auto;
}

.v-card {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1.5rem;
	transition: all 0.3s ease;
}

.v-card:hover {
	transform: translateY(-3px);
	border-color: #0072ff !important;
	box-shadow: 0 4px 20px rgba(0, 114, 255, 0.4) !important;
}

.card-icon {
	background: linear-gradient(45deg, #00c6ff, #0072ff);
	width: 50px;
	height: 50px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	color: white;
	font-size: 28px;
}

.card-content {
	flex: 1;
}

.card-content h3 {
	font-size: 1.2rem;
}

.card-content p {
	font-size: 0.9rem;
	margin: 0;
}

.card-arrow {
	font-size: 24px;
	transition: transform 0.3s ease;
}

.v-card:hover .card-arrow {
	transform: translateX(5px);
	color: #0072ff;
}
</style>
