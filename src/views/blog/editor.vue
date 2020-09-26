<template>
	<div
		class="blog-editor"
		@paste.prevent="onPasteText"
		@keydown.esc.prevent="editorVue.$emit('showimagelist', false)"
		@keydown.enter.exact.prevent="onEnter"
		@keydown.shift.enter.exact.prevent="onEnter"
		@keydown.ctrl.b.exact.prevent="execute('bold')"
		@keydown.ctrl.i.exact.prevent="execute('italic')"
		@keydown.ctrl.u.exact.prevent="execute('underline')"
		@keydown.alt.shift.53.exact.prevent="execute('strikeThrough')"
		@keydown.ctrl.190.exact.prevent="execute('superscript')"
		@keydown.ctrl.188.exact.prevent="execute('subscript')"
		@click="editorVue.$emit('showimagelist', false)"
	>
		<editor-toolbar :bus="editorVue" />
		<editor-image-list
			:bus="editorVue"
			:imagelist.sync="imageList"
			:thumbnail.sync="thumbnail"
			:imageidcounter.sync="imageIdCounter"
		/>
		<div class="block-list">
			<editor-post-block
				v-for="block in blockList"
				:key="block.id"
				:id="block.id"
				:type.sync="block.type"
				:value.sync="block.value"
				:bus="editorVue"
			/>
		</div>
		<div class="guidline"></div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";
import EditorToolbar from "@/components/editor/toolbar.vue";
import EditorImageList from "@/components/editor/image-list.vue";
import EditorPostBlock from "@/components/editor/post-block.vue";

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
// Selection
interface SelectionStyle {
	isend: boolean;
	style: {
		[key: string]: boolean;
	};
}

export const ImageTypes: string[] = [
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
		EditorImageList,
		EditorPostBlock
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

	created() {
		// Actions //
		// Block
		this.editorVue.$on("addblock", this.addBlock);
		this.editorVue.$on("getblock", this.getBlock);
		this.editorVue.$on("removeblock", this.removeBlock);
		// Document
		this.editorVue.$on("execute", this.execute);
		this.editorVue.$on("bind", this.bind);

		// Triggers //
		this.editorVue.$on("onremoveimage", (id: number) => {
			if (this.thumbnail === id) {
				this.thumbnail = -1;
			}
		});

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
		this.execute("insertHTML", `<${type} class="inline">${text}</${type}>`);
	}

	// Triggers //
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

		&::v-deep .placeholder {
			color: $text-color-white-disable;
			pointer-events: none;
		}
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
