<template>
	<div
		:class="{
			'editor-block-heading': true,
			'no-banner': blankBanner
		}"
		@click="onClickContainer"
	>
		<template v-if="!blankBanner">
			<app-image
				:src="value.banner"
				objectfit="cover"
				draggable="false"
				class="banner"
			/>
			<div class="image-overlay"></div>
		</template>
		<div class="title">
			<span
				contenteditable
				v-text="title"
				class="content"
				ref="mainInput"
				@input="onInput"
			></span>
			<span v-if="blankTitle" class="placeholder">제목</span>
			<!-- Control banner image button -->
			<div class="banner-image-control">
				<app-button-tag
					dir="down"
					class="change"
					@click.prevent.stop="changeBannerImage"
				>
					<i class="material-icons">insert_photo</i>
					<template #tag>배경 바꾸기</template>
				</app-button-tag>
				<app-button-tag
					dir="down"
					class="remove"
					@click.prevent.stop="removeBannerImage"
				>
					<i class="material-icons">delete</i>
					<template #tag>배경 제거</template>
				</app-button-tag>
			</div>
		</div>
		<input
			hidden
			type="file"
			accept="image/*"
			ref="bannerImageInput"
			@change="onChangeBannerImage"
		>
	</div>
</template>

<script lang="ts">
import { Vue , Component } from "vue-property-decorator";
import EditorBlock from '@/components/editor/block/block.vue';
import { ImageData } from '@/views/blog/editor.vue';
// Components //
import AppImage from "@/components/app/image.vue";
import AppButtonTag from "@/components/app/button-tag.vue";

const ImageTypes: string[] = [
	"image/apng",
	"image/bmp",
	"image/gif",
	"image/x-icon",
	"image/jpeg",
	"image/png",
	"image/svg+xml",
	"image/tiff",
	"image/webp"
];

@Component({
	components: {
		AppImage,
		AppButtonTag
	}
})
export default class EditorBlockHeading extends EditorBlock {
	type = "heading";
	title: string = "";

	created() {
		this.title = this.value.title;
	}

	onInput(event: InputEvent) {
		let value = (event.target as HTMLSpanElement).innerText;
		this.value.title = value;
	}
	onChangeBannerImage(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let file = (target.files as FileList)[0];
		this.bus.$emit("addimage", file, (image: ImageData) => {
			
		});
	}

	changeBannerImage() {
		(this.$refs["bannerImageInput"] as HTMLInputElement).click();
	}
	removeBannerImage() {
		(this.$refs["bannerImageInput"] as HTMLInputElement).value = "";
		this.value.banner = null;
	}

	get blankTitle() {
		return this.value.title.replaceAll(/\s/g, "") == "";
	}
	get blankBanner() {
		return this.value.banner == null;
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-heading {
	position: relative;

	width: 100%;
	height: 300px;

	// Banner Imag //
	.app-image {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		object-position: center;
	}
	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: linear-gradient(
			transparent 25%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}
	// Control
	.banner-image-control {
		display: flex;
		gap: 16px;

		position: absolute;
		top: 16px;
		right: 16px;
	}

	// Title
	.title {
		display: flex;
		align-items: flex-end;

		position: relative;

		max-width: $post-width-max;
		height: 100%;
		margin: 0 auto;
		padding: 16px 32px;

		font-size: xx-large;

		.content {
			width: 100%;
		}
		.placeholder {
			position: absolute;
			color: $text-color-white-disable;
		}
	}

	&.no-banner {
		height: 201px;

		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
