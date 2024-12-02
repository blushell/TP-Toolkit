<template>
	<v-app :theme="theme">
		<!-- App Bar -->
		<v-app-bar>
			<v-app-bar-nav-icon @click="toggleDrawer" />
			<v-img
				class="ml-8"
				:src="
					theme === 'light'
						? './images/TPLogoFullBlack256.png'
						: './images/TPLogoFullWhite256.png'
				"
				max-height="auto"
				max-width="256"
				contain
				@click="$router.push('/')"
			></v-img>
			<v-app-bar-title class="title">{{ pageTitle }}</v-app-bar-title>
			<v-btn class="mr-2" :icon="themeIcon" @click="toggleTheme" />
		</v-app-bar>

		<!-- Navigation Drawer -->
		<v-navigation-drawer v-model="isDrawerOpen" temporary mobile>
			<v-list v-model:opened="openGroups">
				<v-list-item title="Home" to="/" prepend-icon="mdi-home" />

				<v-divider class="my-2" />

				<!-- Main Group -->
				<v-list-group value="tools">
					<template v-slot:activator="{ props }">
						<v-list-item
							v-bind="props"
							prepend-icon="mdi-tools"
							title="TP Tools"
						/>
					</template>

					<v-list-item
						v-for="item in mainNavItems"
						:key="item.title"
						v-bind="item"
					/>
				</v-list-group>

				<!-- Dev Group -->
				<v-list-group value="dev">
					<template v-slot:activator="{ props }">
						<v-list-item
							v-bind="props"
							prepend-icon="mdi-code-braces"
							title="Plugin Dev"
						/>
					</template>

					<v-list-item
						v-for="item in devNavItems"
						:key="item.title"
						v-bind="item"
					/>
				</v-list-group>

				<!-- Market Items -->
				<v-list-item
					v-for="item in marketNavItems"
					:key="item.title"
					v-bind="item"
				/>
			</v-list>

			<!-- Donate Button -->
			<template #append>
				<div class="pa-4">
					<v-hover v-slot="{ isHovering, props }">
						<a
							href="https://paypal.me/tfjonestown"
							target="_blank"
							rel="noopener noreferrer"
							class="text-decoration-none d-flex align-center justify-center"
							v-bind="props"
						>
							<v-icon
								:icon="isHovering ? 'mdi-heart' : 'mdi-heart-outline'"
								color="red"
								size="small"
								class="mr-1 heart-icon"
								:class="{ wiggle: isHovering }"
							/>
							<span class="text-high-emphasis">Donate</span>
						</a>
					</v-hover>
				</div>
				<!-- SOCIAL ICONS HERE -->
			</template>
		</v-navigation-drawer>

		<!-- Main Content -->
		<v-main>
			<slot />

			<!-- Scroll to Top Button -->
			<v-btn
				v-show="showScrollButton"
				class="scroll-to-top"
				icon
				@click="scrollToTop"
				absolute
				right
				bottom
			>
				<v-icon>mdi-rocket</v-icon>
			</v-btn>

			<!-- Footer -->
			<footer class="d-flex flex-column">
				<div class="d-flex align-center justify-center w-100 px-4 py-2">
					<span>Made with ❤️ by JonesTown</span>
				</div>
				<div class="text-caption text-center pb-2">
					TP Toolkit is not associated nor created by Touch-Portal
				</div>
			</footer>
		</v-main>
	</v-app>
</template>

<script setup>
const pageTitle = computed(() => {
	return useRoute().meta.title || '';
});
const { theme, themeIcon, toggleTheme } = useTheme();
const {
	isDrawerOpen,
	mainNavItems,
	devNavItems,
	marketNavItems,
	toggleDrawer,
} = useNavigation();
const { showScrollButton, scrollToTop } = useScroll();
const openGroups = ref(['tools']);

const socialLinks = [
	{
		name: 'Twitter',
		link: 'https://twitter.com/yourtwitterhandle',
		icon: 'mdi-twitter',
	},
	{
		name: 'Bluesky',
		link: 'https://bluesky.com/yourblueskyhandle',
		icon: 'mdi-butterfly',
	},
	{
		name: 'YouTube',
		link: 'https://www.youtube.com/youryoutubechannel',
		icon: 'mdi-youtube',
	},
	{
		name: 'Twitch',
		link: 'https://kick.com/yourkickhandle',
		icon: 'mdi-twitch',
	},
	{
		name: 'GitHub',
		link: 'https://www.github.com/yourgithubhandle',
		icon: 'mdi-github',
	},
];
</script>

<style scoped>
.title {
	background-image: linear-gradient(12deg, #00c6ff, #001f5c);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	font-weight: 700;
}

.heart-icon {
	transition: all 0.2s ease-in-out;
}

@keyframes wiggle {
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(-10deg);
	}
	50% {
		transform: rotate(10deg);
	}
	75% {
		transform: rotate(-5deg);
	}
	100% {
		transform: rotate(0deg);
	}
}

.wiggle {
	animation: wiggle 0.5s ease-in-out;
}

.scroll-to-top {
	position: fixed;
	bottom: 20px;
	right: 20px;
	background-color: #ffcc00;
	border-radius: 50%;
}

.scroll-to-top .v-icon {
	color: #ffffff;
}

.social-icon:hover {
	transform: scale(1.1);
	transition: transform 0.2s ease;
}
</style>
