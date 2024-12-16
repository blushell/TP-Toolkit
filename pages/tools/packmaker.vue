<template>
	<v-container fluid>
		<v-row>
			<!-- Left Column -->
			<v-col cols="12" md="5">
				<v-card class="pa-4">
					<v-card-text>
						<!-- Upload Zone -->
						<div
							class="upload-zone mb-6"
							:class="{ dragover: isDragging }"
							@dragenter.prevent="isDragging = true"
							@dragover.prevent="isDragging = true"
							@dragleave.prevent="isDragging = false"
							@drop.prevent="handleDrop"
							@click="$refs.fileInput.click()"
						>
							<input
								ref="fileInput"
								type="file"
								multiple
								accept=".jpg,.jpeg,.png,.gif"
								class="d-none"
								@change="handleFileSelect"
							/>
							<div
								class="text-grey-darken-1 text-body-1 font-weight-medium text-center"
							>
								<v-icon size="48" color="grey-darken-1">
									mdi-image-search
								</v-icon>
								<div>Drag & Drop Images here or click to upload</div>
								<div class="text-caption">
									File types allowed: PNG, JPG, GIF
								</div>
								<div class="text-caption">
									Maximum file size: {{ MAX_FILE_SIZE / 1024 / 1024 }}MB
								</div>
							</div>
						</div>

						<v-text-field
							v-model="packData.name"
							label="Icon Pack Name"
							placeholder="Epic Icon Pack"
							density="compact"
							required
							:rules="[(v) => !!v || 'Name is required']"
						/>

						<v-text-field
							v-model="packData.author"
							label="Enter Author Name"
							placeholder="by awesome icon artist"
							density="compact"
							required
							:rules="[(v) => !!v || 'Author is required']"
						/>

						<v-text-field
							v-model="packData.link"
							label="Your Personal URL"
							placeholder="https://www.touch-portal.com"
							type="url"
							density="compact"
							:rules="[
								(v) =>
									!v || /^https?:\/\/.+/.test(v) || 'Please enter a valid URL',
							]"
						/>

						<label class="text-body-2 mb-1 d-block">
							Background Color [Preview Only]
						</label>
						<v-color-picker v-model="packData.bgcolor" mode="hex" />
						<v-checkbox
							v-model="packData.resize"
							label="Resize (256x256)"
							:default="true"
						/>
					</v-card-text>
					<v-card-actions>
						<v-btn
							color="primary"
							block
							variant="tonal"
							:loading="loading"
							:disabled="!canCreatePack"
							@click="createIconPack"
							text="Create Icon Pack"
						/>
					</v-card-actions>
				</v-card>
			</v-col>

			<!-- Right Column -->
			<v-col cols="12" md="7">
				<v-card class="pa-4">
					<v-card-title class="d-flex justify-space-between mb-4">
						<div>
							Icon Pack Preview
							<span v-if="images.length > 0">({{ images.length }} icons)</span>
						</div>
						<v-btn
							v-if="images.length"
							variant="tonal"
							color="error"
							:disabled="!images.length"
							@click="confirmRemoveAll"
							text="Remove All"
						/>
					</v-card-title>
					<!-- Image Preview Grid -->
					<v-card-text>
						<div
							v-if="images.length"
							class="image-grid rounded"
							:style="{ backgroundColor: packData.bgcolor }"
						>
							<div
								v-for="(image, index) in images"
								:key="index"
								class="image-item"
							>
								<img :src="image.preview" alt="Icon preview" />
								<div class="remove-icon" @click="confirmRemoveImage(index)">
									<v-icon icon="mdi-delete" color="white" />
								</div>
							</div>
						</div>
						<div v-else class="text-center text-medium-emphasis pa-4">
							No images uploaded yet
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Clear All ImagesDialog -->
		<v-dialog v-model="dialogs.removeAll" max-width="400">
			<v-card>
				<v-card-title>Clear All Images?</v-card-title>
				<v-card-text>
					This will remove all uploaded images. This action cannot be undone.
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="grey"
						variant="text"
						@click="dialogs.removeAll = false"
						text="Cancel"
					/>
					<v-btn color="error" @click="removeAllImages" text="Remove All" />
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Remove Single Image Dialog -->
		<v-dialog v-model="dialogs.removeImage" max-width="400">
			<v-card>
				<v-card-title>Remove Image?</v-card-title>
				<v-card-text> Are you sure you want to remove this image? </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="grey"
						@click="dialogs.removeImage = false"
						text="Cancel"
					/>
					<v-btn color="error" @click="removeImage" text="Remove" />
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Snackbar -->
		<v-snackbar
			v-model="snackbar.show"
			:color="snackbar.color"
			:timeout="snackbar.timeout"
		>
			{{ snackbar.text }}
		</v-snackbar>
	</v-container>
</template>
<script setup>
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
const { snackbar, showSnackbar } = useSnackbar();

useHead({ title: `Icon Packer` });
definePageMeta({ title: 'Icon Pack Builder' });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const packData = ref({
	name: '',
	author: '',
	link: '',
	bgcolor: '#FFFFFF',
	resize: true,
});

const isDragging = ref(false);
const fileInput = ref(null);
const images = ref([]);
const loading = ref(false);
const selectedImageIndex = ref(null);

const dialogs = ref({
	removeAll: false,
	removeImage: false,
});

const canCreatePack = computed(() => {
	return (
		images.value.length > 0 && packData.value.name && packData.value.author
	);
});

const handleFileSelect = (event) => {
	const files = Array.from(event.target.files);
	addFiles(files);
	event.target.value = ''; // Reset input
};

const handleDrop = (event) => {
	isDragging.value = false;
	const files = Array.from(event.dataTransfer.files);
	addFiles(files);
};

const addFiles = async (files) => {
	const validFiles = files.filter((file) => ALLOWED_TYPES.includes(file.type));

	if (validFiles.length !== files.length) {
		showSnackbar(
			'Some files were skipped. Only PNG, JPG, and GIF files are allowed.',
			'warning'
		);
	}

	const imagePromises = validFiles.map(async (file) => {
		if (file.size > MAX_FILE_SIZE) {
			showSnackbar(
				`${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
				'error'
			);
			return;
		}

		if (images.value.some((img) => img.file.name === file.name)) {
			showSnackbar(`${file.name} already exists`, 'warning');
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			images.value.push({
				file,
				preview: e.target.result,
			});
		};
		reader.readAsDataURL(file);
	});

	await Promise.all(imagePromises);
};

const confirmRemoveImage = (index) => {
	selectedImageIndex.value = index;
	dialogs.value.removeImage = true;
};

const removeImage = () => {
	if (selectedImageIndex.value !== null) {
		images.value.splice(selectedImageIndex.value, 1);
	}
	dialogs.value.removeImage = false;
};

const confirmRemoveAll = () => {
	dialogs.value.removeAll = true;
};

const removeAllImages = () => {
	images.value = [];
	dialogs.value.removeAll = false;
};

const resizeImage = (img, maxWidth, maxHeight) => {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = maxWidth;
		canvas.height = maxHeight;

		ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
		canvas.toBlob(resolve, 'image/png');
	});
};

const createIconPack = async () => {
	loading.value = true;
	const zip = new JSZip();

	try {
		await addInfoFileToZip(zip);

		for (const image of images.value) {
			await addImageToZip(zip, image);
		}

		const content = await zip.generateAsync({ type: 'blob' });
		const fileName = `${packData.value.name
			.toLowerCase()
			.replace(/\s+/g, '-')}.tpi`;
		saveAs(content, fileName);
		showSnackbar('Icon pack created successfully!');
	} catch (error) {
		showSnackbar('Error creating icon pack', 'error');
		console.error(error);
	} finally {
		loading.value = false;
	}
};

const addInfoFileToZip = async (zip) => {
	const infoContent = `name=${packData.value.name}
  author=${packData.value.author}
  link=${packData.value.link}
  bgcolor=${packData.value.bgcolor}`;
	zip.file('info.txt', infoContent);
};

const addImageToZip = async (zip, image) => {
	if (packData.value.resize) {
		const img = new Image();
		img.src = image.preview;
		await new Promise((resolve) => {
			img.onload = resolve;
		});
		const blob = await resizeImage(img, 256, 256);
		zip.file(image.file.name, blob);
	} else {
		zip.file(image.file.name, image.file);
	}
};
</script>
<style scoped>
.upload-zone {
	height: 150px !important;
}

.image-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 16px;
	padding: 16px;
}

.image-item {
	position: relative;
	aspect-ratio: 1;
	overflow: hidden;
}

.image-item img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.remove-icon {
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.8);
	padding: 2px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s;
}

.image-item:hover .remove-icon {
	opacity: 1;
}

.image-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s;
	cursor: pointer;
}

/* .image-overlay {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s;
	cursor: pointer;
	width: 50px;
	height: 50px;
	border-radius: 50%;
} */

.image-item:hover .image-overlay {
	opacity: 1;
}
</style>
