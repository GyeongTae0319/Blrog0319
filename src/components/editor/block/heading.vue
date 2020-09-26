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
				:src="banner"
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
	</div>
</template>

<script lang="ts">
import { Vue , Component, Watch } from "vue-property-decorator";
import EditorBlock from '@/components/editor/block/block.vue';
import { BlockHeadingData, ImageData } from '@/views/blog/editor.vue';
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
export default class EditorBlockHeading extends EditorBlock<BlockHeadingData> {
	type = "heading";

	// Copy of prop
	title: string = "";
	banner: string = "";

	created() {
		this.title = this.value.title;

		this.bus.$on("onremoveimage", (id: number) => {
			if (this.value.banner === id) {
				this.$set(this.value, "banner", null);
			}
		});
	}

	// On title input
	onInput(event: InputEvent) {
		let value = (event.target as HTMLSpanElement).innerText;
		this.$set(this.value, "title", value);
	}

	// Banner control
	changeBannerImage() {
		this.bus.$emit("selectimage", (image: ImageData | null) => {
			if (image == null) {
				this.$set(this.value, "banner", null);
				return;
			}
			this.$set(this.value, "banner", image.id);
		});
	}
	removeBannerImage() {
		this.$set(this.value, "banner", null);
	}

	// Check value is blank
	get blankTitle(): boolean {
		return this.value.title.replaceAll(/\s/g, "") == "";
	}
	get blankBanner(): boolean {
		return this.value.banner == null;
	}

	// Check value change
	@Watch("value.banner", {
		deep: true
	}) onChangeValue(value: BlockHeadingData) {
		// Set banner value
		this.bus.$emit("getimage", this.value.banner, (image: ImageData | undefined) => {
			if (image == undefined) {
				this.banner = "";
				return;
			}
			this.banner = image.value;
		});
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

		font-size: xxx-large;

		.content {
			width: 100%;
		}
		.placeholder {
			position: absolute;
		}
	}

	&.no-banner {
		height: 201px;

		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
