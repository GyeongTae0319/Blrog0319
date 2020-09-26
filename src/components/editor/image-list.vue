<template>
	<div
		:class="{
			'editor-image-list': true,
			'show': showImageList || selectMode
		}"
		@click.stop
	>
		<div class="header">
			<span class="title">사진 목록</span>
			<app-button @click.prevent.stop="onClickClose">
				<i class="material-icons">close</i>
			</app-button>
		</div>
		<div class="list">
			<app-button class="add-image" @click="onClickAddImage">
				<i class="material-icons">add</i>
			</app-button>
			<editor-image-list-image
				v-for="image in imagelist"
				:key="image.id"
				:image="image"
				:isthumbnail="thumbnail === image.id"
				:bus="bus"
				@click.prevent.stop="onClickImage(image)"
			/>
		</div>
		<div :class="{
			'board': true,
			'show': selectMode
		}"></div>
		<input
			type="file"
			accept="image/*"
			multiple
			hidden
			ref="addImageInput"
			@change="onChangeAddImageInput"
		>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ImageData, ImageTypes } from '@/views/blog/editor.vue';
// Components //
import AppButton from "@/components/app/button.vue";
import EditorImageListImage from "@/components/editor/image-list-image.vue";

@Component({
	components: {
		AppButton,
		EditorImageListImage
	}
})
export default class EditorImageList extends Vue {
	@Prop({
		type: Vue,
		required: true
	})
	bus!: Vue;
	@Prop({
		type: Array,
		required: true
	})
	imagelist!: ImageData[];
	@Prop({
		type: Number,
		required: true
	})
	thumbnail!: number;
	@Prop({
		type: Number,
		required: true
	})
	imageidcounter!: number;

	showImageList: boolean = false;
	selectMode: boolean = false;
	selectCollback: (image: ImageData | null) => void = () => {};

	created() {
		this.bus.$on("addimage", this.addImage);
		this.bus.$on("getimage", this.getImage);
		this.bus.$on("removeimage", this.removeImage);
		this.bus.$on("selectimage", this.selectImage);
		this.bus.$on("showimagelist", (show: boolean) => this.showImageList = show);
	}

	// Actions
	addImage(file: File, success: (image: ImageData) => void = () => {}) {
		// Check file is null and type
		if (!(file && ImageTypes.includes(file.type))) {
			console.log("[ERROR] File error! (is null or type error) <@/components/editor/image-list.vue#addImage()>");
			return false;
		}

		// Read image to base64
		let fileReader = new FileReader();
		fileReader.onload = (event) => {
			// Check target is null
			if (event.target == null) {
				console.log("[ERROR] File reader event target is null! <@/components/editor/image-list.vue#addImage()>");
				return false;
			}

			// Get image data
			let image = new Image();
			image.onload = () => {
				let data: ImageData = {
					id: this.imageidcounter,
					value: image.src,
					alt: "",
					width: image.width,
					height: image.height
				}
				// Add data
				this.$emit("update:imagelist", this.imagelist.concat([data]));
				this.$emit("update:imageidcounter", this.imageidcounter + 1);
				success(data);
			}
			image.src = event.target.result as string;
		}
		fileReader.readAsDataURL(file);
	}
	getImage(id: number, get: (image: ImageData | undefined) => void = () => {}): ImageData | undefined {
		let image = this.imagelist.find(value => value.id === id);
		get(image);
		return image;
	}
	removeImage(id: number): boolean {
		let index = this.imagelist.findIndex(value => value.id === id);
		if (index == -1) return false;
		this.$emit("update:imagelist", this.imagelist.slice(0, index).concat(this.imagelist.slice(index + 1)));
		this.bus.$emit("onremoveimage", id);
		return true;
	}
	selectImage(select: (image: ImageData | null) => void) {
		this.selectMode = true;
		this.selectCollback = select;
	}

	// Triggers //
	//
	// Add image
	onClickAddImage(event: MouseEvent) {
		(this.$refs["addImageInput"] as HTMLInputElement).click();
	}
	onChangeAddImageInput(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let fileList = (target.files as FileList);
		for (let i = 0; i < fileList.length; i++) {
			let file = fileList.item(i);
			if (file == null) continue;
			if (!ImageTypes.includes(file.type)) continue;
			this.addImage(file);
		}
		target.value = "";
	}
	//
	// Click
	onClickImage(image: ImageData) {
		if (this.selectMode) {
			this.selectCollback(image);
			this.selectCollback = () => {};
			this.selectMode = false;
		} else if (this.thumbnail === image.id) {
			this.$emit("update:thumbnail", -1);
		} else {
			this.$emit("update:thumbnail", image.id);
		}
	}
	onClickClose() {
		this.showImageList = false;
		if (this.selectMode) {
			this.selectCollback(null);
			this.selectCollback = () => {};
			this.selectMode = false;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-image-list {
	display: flex;
	flex-direction: column;

	position: fixed;
	z-index: 2;
	top: $header-height;
	right: -336px;

	height: calc(100% - #{$header-height});

	background-color: $background-color-lv1;

	transition: right 0.25s;

	.header {
		display: flex;
		flex-shrink: 0;
		justify-content: space-between;

		width: 100%;
		padding: 16px;

		border-bottom: 1px solid $background-color-lv2;
	}
	.list {
		display: grid;
		grid-template-columns: repeat(3, 96px);
		grid-template-rows: repeat(auto-fill, 96px);
		gap: 8px;

		flex-grow: 1;
		padding: 16px;

		overflow: hidden auto;

		.add-image {
			width: 100%;
			height: 100%;

			border: 2px dashed $background-color-lv3;
			border-radius: 8px;

			color: $background-color-lv3;

			transition: border-color 0.1s, color 0.1s;

			&:hover {
				border-color: $background-color-lv4;
				color: $background-color-lv4;
			}
		}
	}
	.board {
		position: absolute;
		z-index: -1;
		left: -100vw;
		bottom: 0;

		width: 100vw;
		height: 100%;

		background-color: rgba(#000000, 0.25);

		opacity: 0;
		pointer-events: none;

		transition: opacity 0.25s;

		&.show {
			opacity: 1;
			pointer-events: all;
		}
	}

	&.show {
		right: 0;
	}
}
</style>
