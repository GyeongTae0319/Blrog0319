<template>
	<div
		class="blog-editor"
		@paste.prevent="onPasteText"
		@keydown.esc.prevent="showImageList = false"
		@keydown.enter.exact.prevent="onEnter"
		@keydown.shift.enter.exact.prevent="onEnter"
		@keydown.ctrl.b.exact.prevent="execute('bold')"
		@keydown.ctrl.i.exact.prevent="execute('italic')"
		@keydown.ctrl.u.exact.prevent="execute('underline')"
		@keydown.alt.shift.53.exact.prevent="execute('strikeThrough')"
		@keydown.ctrl.190.exact.prevent="execute('superscript')"
		@keydown.ctrl.188.exact.prevent="execute('subscript')"
		@click="showImageList = false"
	>
		<editor-toolbar :bus="editorVue" />
		<div
			:class="{
				'image-list': true,
				'show': showImageList
			}"
			@click.stop="showImageList = true"
		>
			<div class="header">
				<span class="title">사진 목록</span>
				<app-button @click.stop="showImageList = false">
					<i class="material-icons">close</i>
				</app-button>
			</div>
			<div class="list">
				<app-button
					class="add-image"
					@click="onClickAddImage"
				>
					<i class="material-icons">add</i>
				</app-button>
				<editor-image
					v-for="image in imageList"
					:key="image.id"
					:image="image"
					:isthumbnail="thumbnail === image.id"
					:bus="editorVue"
					@click.prevent.stop="thumbnail = image.id"
				/>
			</div>
		</div>
		<div class="block-list">
			<editor-post-block
				v-for="block in blockList"
				:key="block.id"
				:id="block.id"
				:type="block.type"
				:value="block.value"
				:bus="editorVue"
			/>
		</div>
		<div class="guidline"></div>
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
import { Vue, Component, Watch } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";
import EditorToolbar from "@/components/editor/toolbar.vue";
import EditorPostBlock from "@/components/editor/post-block.vue";
import EditorImage from "@/components/editor/image.vue";

// Interfaces //
// Blocks
export interface BlockData {
	id: number;
	type: string;
	value: { [key: string]: any };
}
export interface BlockHeadingData {
	title: string;
	banner: number | null;
}
export interface BlockSubheadingData {
	content: string;
	id: string;
}
export interface BlockParahraphData {
	content: string;
}
export interface BlockQuoteData {
	content: string;
	source: string;
	url: string | null;
}
export interface BlockListData {
	content: string;
}
export interface BlockImageData {
	type: "album" | "slide";
	size: "screen" | "post"
	value: ImageData[];
}
export interface BlockVideoData {
	url: string;
	size: "post" | "screen";
}
export interface BlockHorizontalRuleData {
	type: number;
	align: "left" | "center" | "right";
}
export interface BlockTableData {}
export interface BlockcalendarData {}
export interface BlockLinkData {
	url: string;
	type: "horizontal" | "vertical";
}
export interface BlockFileData {}
export interface BlockMissingData {
	type: string;
}
// Image
export interface ImageData {
	id: number;
	value: string;
	alt: string;
	width: number;
	height: number;
}

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
		AppButton,
		EditorToolbar,
		EditorPostBlock,
		EditorImage
	}
})
export default class BlogEditor extends Vue {
	// Event bus
	editorVue: Vue = new Vue();

	// Editor units
	blockList: BlockData[] = [];
	blockIdCounter: number = 0;
	imageList: ImageData[] = [];
	imageIdCounter: number = 0;

	// Post heading
	heading: BlockHeadingData = {
		title: "",
		banner: null,
	}
	// Thumbnail
	thumbnail: number = -1;

	showImageList: boolean = false;

	created() {
		// Actions //
		// Block
		this.editorVue.$on("addblock", this.addBlock);
		this.editorVue.$on("getblock", this.getBlock);
		this.editorVue.$on("removeblock", this.removeBlock);
		// Image
		this.editorVue.$on("addimage", this.addImage);
		this.editorVue.$on("getimage", this.getImage);
		this.editorVue.$on("removeimage", this.removeImage);
		// Document
		this.editorVue.$on("execute", this.execute);
		this.editorVue.$on("bind", this.bind);
		// Layout
		this.editorVue.$on("showimagelist", (show: boolean) => this.showImageList = show);

		// Init post
		this.addBlock("heading", this.heading);
	}

	// Actions //
	//
	// Block
	addBlock(type: string, value: { [key: string]: any } = {}) {
		this.blockList.push({
			id: ++this.blockIdCounter,
			type: type,
			value: value
		});
	}
	getBlock(id: number, get: (block: BlockData) => void = () => {}): BlockData | null {
		let block = this.blockList.find(value => value.id === id);
		if (block == undefined) return null;
		get(block);
		return block;
	}
	removeBlock(id: number): boolean {
		let index = this.blockList.findIndex(value => value.id === id);
		if (index == -1) return false;
		this.blockList.splice(index, 1);
		this.editorVue.$emit("onremoveblock", id);
		return true;
	}
	//
	// Image
	addImage(file: File, success: (image: ImageData) => void = () => {}) {
		if (file && ImageTypes.includes(file.type)) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = (event) => {
				if (event.target) {
					let image = new Image();
					image.onload = () => {
						let data: ImageData = {
							id: ++this.imageIdCounter,
							value: image.src,
							alt: "",
							width: image.width,
							height: image.height
						};
						this.imageList.push(data);
						success(data);
					}
					image.src = event.target.result as string;
				} else console.log("[ERR] Event target error! <@/views/blog/editor.vue#addImage()>");
			}
		} else console.log("[ERR] File error! <@/views/blog/editor.vue#addImage()>");
	}
	getImage(id: number, get: (image: ImageData) => void = () => {}): ImageData | null {
		let image = this.imageList.find(value => value.id === id);
		if (image == undefined) return null;
		get(image);
		return image;
	}
	removeImage(id: number): boolean {
		let index = this.imageList.findIndex(value => value.id === id);
		if (index == -1) return false;
		this.imageList.splice(index, 1);
		this.editorVue.$emit("onremoveimage", id);
		return true;
	}
	//
	// Execute command
	execute(command: string, value: string | undefined = undefined) {
		document.execCommand(command, false, value);
	}
	//
	// Bind contents
	bind(type: string) {
		let selection = window.getSelection();
		if (selection == null) return;

		let text = selection.toString();
		this.execute("delete");
		this.execute("insertHTML", `<code class="inline">${text}</code><span></span>`);
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
	// Press enter
	onEnter(event: KeyboardEvent) {
		let selection = window.getSelection();
		if (selection == null) return;

		let text = "\n";
		if (selection.focusOffset == selection.focusNode?.nodeValue?.length) {
			text += "\n";
		}
		this.execute("insertHTML", text);
	}
	//
	// Paste text
	onPasteText(evenet: ClipboardEvent) {
		this.execute("insertHTML", evenet.clipboardData?.getData("text/plain") || "");
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-editor {
	display: flex;
	flex-direction: column;

	.editor-toolbar {
		z-index: 1;
		flex-shrink: 0;

		background-color: $background-color;
	}
	.block-list {
		position: relative;

		flex-grow: 1;
		overflow: hidden auto;
	}
}

.image-list {
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

	&.show {
		right: 0;
	}
}

.guidline {
	position: fixed;
	bottom: 0;

	width: 100%;
	height: 100%;

	pointer-events: none;

	&::before {
		content: "";

		display: block;
		box-sizing: border-box;

		width: 100%;
		max-width: $post-width-max + 2px;
		height: 100%;
		margin: 0 auto;

		border: 1px dashed $background-color-lv2;
		border-width: 0 1px;
	}
}
</style>
