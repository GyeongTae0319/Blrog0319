<template>
	<div
		:class="defaultClasses"
		@click="onClickContainer"
	>
		<div
			tabindex="0" 
			:class="['block', size]"
			@focus="onFocus"
			@blur="onBlur"
			ref="mainInput"
		>
			<app-button
				v-if="isBlank"
				class="placeholder"
				@click="onClickSelectImage"
			>
				<span class="text">사진 선택</span>
			</app-button>
			<div :class="['image-list', propType]">
				<editor-block-image-object
					v-for="image in imageList"
					:key="image.id"
					:image="image"
					class="image"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockImageData, ImageData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';
// Components //
import AppButton from "@/components/app/button.vue";
import EditorBlockImageObject from "@/components/editor/block/image-object.vue";
import AppImage from "@/components/app/image.vue";

@Component({
	components: {
		AppButton,
		AppImage,
		EditorBlockImageObject
	}
})
export default class EditorBlockImage extends EditorBlock<BlockImageData> {
	type = "image";

	// Copy of props
	imageList: ImageData[] = [];
	propType: "album" | "slide" = "album";
	size: "image" | "post" | "screen" = "image";

	created() {
		// Reset value
		if (!(this.value.value && this.value.type && this.value.size)) {
			this.$set(this.value, "value", []);
			this.$set(this.value, "type", "album");
			this.$set(this.value, "size", "image");
		}

		// Copy value
		this.propType = this.value.type;
		this.size = this.value.size;

		this.updateImageDataList();

		// Check post image list change
		this.bus.$on("onremoveimage", (id: number) => {
			let index = this.value.value.findIndex(value => value === id);
			if (index < 0) return;
			this.value.value.splice(index, 1);
			this.imageList.splice(index, 1);
		});
	}

	onClickSelectImage() {
		this.bus.$emit("selectimage", (image: ImageData | null) => {
			if (image == null) return;
			this.addImage(image);
		});
	}

	// Image list control
	addImage(data: ImageData) {
		let index = this.value.value.push(data.id) - 1;
		this.imageList[index] = data;
	}
	removeImage(index: number) {
		this.value.value.splice(index, 1);
		this.imageList.splice(index, 1);
	}

	updateImageDataList() {
		this.imageList = [];
		for (let i = 0; i < this.value.value.length; i++) {
			this.bus.$emit("getimage", this.value.value[i], (data: ImageData) => {
				this.imageList[i] = data;
			});
		}
	}

	get isBlank(): boolean {
		return this.value.value.length < 1;
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.block {
	.placeholder {
		width: 100%;
		max-width: $post-width-max;
		height: 300px;
		margin: 0 auto;
		padding: 12px;

		border: 4px solid transparent;

		transition: border-color 0.1s;

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;

			width: 100%;
			height: 100%;

			background-color: $background-color-lv1;

			color: $text-color-white-desc;
			font-size: large;
		}
	}

	.image {
		display: flex;
	}

	&.image {
		max-width: 100% !important;

		.image {
			width: auto;
			height: auto;
		}
	}
	&.post {
		.image {
			width: 100%;
		}
	}
	&.screen {
		max-width: 100% !important;

		.image {
			width: 100%;
		}
	}
}
</style>
