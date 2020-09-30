<template>
	<div
		class="editor-block-image"
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
				<app-image
					v-for="image in imageList"
					:key="image.id"
					:src="image.value"
					class="image"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { BlockImageData, ImageData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';
// Components //
import AppButton from "@/components/app/button.vue";
import AppImage from "@/components/app/image.vue";

@Component({
	components: { AppButton, AppImage }
})
export default class EditorBlockImage extends EditorBlock<BlockImageData> {
	type = "image";

	// Copy of props
	imageList: ImageData[] = [];
	propType: "album" | "slide" = "album";
	size: "image" | "post" | "screen" = "image";

	created() {
		if (!(this.value.value && this.value.type && this.value.size)) {
			this.$set(this.value, "value", []);
			this.$set(this.value, "type", "album");
			this.$set(this.value, "size", "image");
		}
		this.propType = this.value.type;
		this.size = this.value.size;
		this.getImageList();
	}

	getImageList() {
		for (let i = 0; i < this.value.value.length; i++) {
			this.bus.$emit("getimage", this.value.value[i], (image: ImageData) => {
				this.imageList.push(image);
			});
		}
	}

	onClickSelectImage() {
		this.bus.$emit("selectimage", (image: ImageData | null) => {
			if (image == null) return;
			this.value.value.push(image.id);
		});
	}

	get isBlank(): boolean {
		return this.value.value.length < 1;
	}

	@Watch("value.value", {
		deep: true
	}) onChangeImageList() {
		this.getImageList();
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
