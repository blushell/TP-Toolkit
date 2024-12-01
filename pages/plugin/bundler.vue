<template>
	<v-container fluid justify="center">
		<v-card class="mx-auto pa-4" max-width="800">
			<v-card-title class="text-center mb-4 text-wrap">
				Upload your plugin folder you want to turn into a .tpp file
			</v-card-title>
			<v-card-text>
				<!-- Upload Area -->
				<div
					class="upload-zone"
					:class="{ dragover: isDragging }"
					@dragenter.prevent="isDragging = true"
					@dragover.prevent="isDragging = true"
					@dragleave.prevent="isDragging = false"
					@drop.prevent="handleDrop"
					@click="$refs.folderInput.click()"
				>
					<input
						ref="folderInput"
						type="file"
						webkitdirectory
						directory
						class="d-none"
						@change="handleFolderSelect"
					/>
					<div class="text-center">
						<div class="text-grey-darken-1 text-body-1 font-weight-medium">
							<v-icon size="48" color="grey-darken-1">
								mdi-folder-upload
							</v-icon>
							<div class="mt-4">
								Drag & Drop a folder here<br />or click to upload
							</div>
						</div>
					</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<!-- Bundle Button -->
				<v-btn
					color="primary"
					block
					variant="tonal"
					@click="bundlePlugin"
					:disabled="!isValid"
				>
					Bundle Plugin
				</v-btn>
			</v-card-actions>
			<!-- Snackbar -->
			<v-snackbar
				v-model="snackbar.show"
				:color="snackbar.color"
				:timeout="snackbar.timeout"
			>
				{{ snackbar.text }}
			</v-snackbar>
		</v-card>
	</v-container>
</template>
<script setup>
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

useHead({ title: `Plugin Bundler` });
definePageMeta({ title: 'Plugin Bundler' });

const { snackbar, showSnackbar } = useSnackbar();

const folderInput = ref(null);
const isDragging = ref(false);
const isValid = ref(false);
const files = ref([]);

const handleFolderSelect = (event) => {
	files.value = Array.from(event.target.files);
	validateFiles();
};

const handleDrop = async (event) => {
	isDragging.value = false;

	// Get all items from the drop event
	const items = Array.from(event.dataTransfer.items);
	files.value = []; // Reset files array

	// Process each dropped item
	for (const item of items) {
		if (item.kind === 'file') {
			const entry = item.webkitGetAsEntry();
			if (entry.isDirectory) {
				files.value.rootFolder = entry.name;
				await readDirectory(entry);
			} else {
				files.value.push(item.getAsFile());
			}
		}
	}
	validateFiles();
};

// Helper function to read directory contents recursively
const readDirectory = async (dirEntry, path = '') => {
	const reader = dirEntry.createReader();

	// Read entries in the directory
	const entries = await new Promise((resolve) => {
		reader.readEntries((entries) => resolve(entries));
	});

	// Process each entry
	for (const entry of entries) {
		const fullPath = path ? `${path}/${entry.name}` : entry.name;

		if (entry.isFile) {
			const file = await new Promise((resolve) => {
				entry.file((file) => {
					file.fullPath = fullPath;
					resolve(file);
				});
			});
			files.value.push(file);
		} else if (entry.isDirectory) {
			await readDirectory(entry, fullPath);
		}
	}
};

const validateFiles = () => {
	const hasEntryFile = files.value.some((file) => file.name === 'entry.tp');
	const hasPngFile = files.value.some((file) => file.name.endsWith('.png'));

	if (!hasEntryFile || !hasPngFile) {
		let message = 'Missing required files:';
		if (!hasEntryFile) message += ' entry.tp';
		if (!hasPngFile) message += ' .png icon';
		showSnackbar(message, 'error');
		isValid.value = false;
		return;
	}
	isValid.value = true;
};

const resetUpload = () => {
	files.value = [];
	isValid.value = false;
	if (folderInput.value) {
		folderInput.value.value = ''; // Clear the file input
	}
};

const bundlePlugin = async () => {
	if (!isValid.value) return;

	try {
		const zip = new JSZip();

		// Get folder name - handle both drag-drop and file select cases
		let folderName;
		if (files.value[0].webkitRelativePath) {
			// File input case
			folderName = files.value[0].webkitRelativePath.split('/')[0];
		} else {
			// Drag and drop case
			folderName = files.value.rootFolder || 'plugin';
		}

		for (const file of files.value) {
			const content = await file.arrayBuffer();
			if (file.webkitRelativePath) {
				// File input case - use the relative path directly
				zip.file(file.webkitRelativePath, content);
			} else {
				// Drag and drop case - prepend the root folder name
				const filePath = file.fullPath || file.name;
				zip.file(`${folderName}/${filePath}`, content);
			}
		}

		const zipBlob = await zip.generateAsync({ type: 'blob' });
		saveAs(zipBlob, `${folderName}.tpp`);

		showSnackbar('Plugin bundled successfully!', 'success');
		resetUpload(); // Reset after successful download
	} catch (error) {
		console.log('Error bundling plugin: ' + error.message);
	}
};
</script>
