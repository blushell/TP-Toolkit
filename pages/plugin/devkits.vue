<template>
	<v-container fluid class="px-4">
		<v-row justify="center" class="mt-4">
			<v-col cols="12" sm="10" md="8" lg="6" class="px-2">
				<v-card
					v-for="sdk in sdkList"
					:key="sdk.repository"
					class="mb-4"
					elevation="2"
				>
					<v-card-item>
						<div class="d-flex flex-column flex-sm-row align-center">
							<div class="icon-wrapper mb-4 mb-sm-0 me-sm-8">
								<i :class="['mdi', sdk.icon, 'language-icon']" />
							</div>
							<div class="flex-grow-1 text-center text-sm-left">
								<v-card-subtitle class="pa-0 mb-2">
									Author: {{ sdk.author }}
								</v-card-subtitle>
								<v-card-text class="pa-0 mb-4">
									<p>{{ sdk.description }}</p>
								</v-card-text>
								<v-card-actions class="pa-0 justify-center justify-sm-start">
									<v-btn
										:href="sdk.repository"
										target="_blank"
										color="primary"
										variant="tonal"
										class="px-6"
									>
										Link
									</v-btn>
								</v-card-actions>
							</div>
						</div>
					</v-card-item>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { sdkData } from '~/data/sdkData.js';

useHead({ title: `Devkits` });
definePageMeta({ title: 'Plugin Devkits' });

const sdkList = ref(sdkData);
</script>

<style scoped>
.language-icon {
	font-size: clamp(48px, 5vw, 72px);
	color: #666;
}

.icon-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 96px;
}

@media (max-width: 600px) {
	.v-card-item {
		padding: 16px;
	}
}

@media (min-width: 601px) {
	.v-card-item {
		padding: 24px;
	}
}
</style>
