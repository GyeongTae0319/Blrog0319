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
			<!-- Change banner image button -->
			<app-button-tag
				dir="left"
				class="banner-image-input"
				@click="changeBannerImage"
			>
				<i class="material-icons">insert_photo</i>
				<template #tag>배경 사진 바꾸기</template>
			</app-button-tag>
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
const FunctionKeysRegex = /(F[0-9]{1,2}|Arrow.*|Control|Shift|Alt|Meta|Tab|Insert|Delete|Home|End|PageUp|PageDown|Escape|ScrollLock|Pause|NumLock|Backspace)/;

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
		if (file && ImageTypes.includes(file.type)) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = (event) => {
				this.value.banner = event.target?.result as string;
			}
		}
	}

	changeBannerImage() {
		(this.$refs["bannerImageInput"] as HTMLInputElement).click();
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

	.title {
		display: flex;
		align-items: flex-end;

		position: relative;

		max-width: 900px;
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
	.banner-image-input {
		position: absolute;
		top: 16px;
		right: 16px;
	}

	&.no-banner {
		height: 201px;

		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
