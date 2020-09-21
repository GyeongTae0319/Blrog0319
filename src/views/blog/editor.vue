<template>
	<div
		class="blog-editor"
		@paste.prevent="pastePlainText"
		@keydown.enter.exact.prevent="onEnter"
		@keydown.shift.enter.exact.prevent="onEnter"
		@keydown.ctrl.b.exact.prevent="execute('bold')"
		@keydown.ctrl.i.exact.prevent="execute('italic')"
		@keydown.ctrl.u.exact.prevent="execute('underline')"
		@keydown.alt.shift.53.exact.prevent="execute('strikeThrough')"
		@keydown.ctrl.190.exact.prevent="execute('superscript')"
		@keydown.ctrl.188.exact.prevent="execute('subscript')"
	>
		<editor-header :bus="editorVue" />
		<div class="blocks">
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
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// Components //
import EditorHeader from "@/components/editor/header.vue";
import EditorPostBlock from "@/components/editor/post-block.vue";

// Interfaces //
export interface BlockData {
	id: number;
	type: string;
	value: { [key: string]: any };
}
export interface BlockHeadingData {
	title: string;
	banner: string | null;
}
// Image
export interface ImageData {
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
		EditorHeader,
		EditorPostBlock
	}
})
export default class BlogEditor extends Vue {
	// Event bus
	editorVue: Vue = new Vue();

	// Editor units
	blockList: BlockData[] = [];
	imageList: ImageData[] = [];
	blockIdCounter = 0;

	// Post heading
	heading: BlockHeadingData = {
		title: "",
		banner: null,
	}

	created() {
		this.editorVue.$on("addblock", this.addBlock);
		this.editorVue.$on("addimage", this.addImage);
		this.editorVue.$on("execute", this.execute);

		this.addBlock("heading", this.heading);
	}

	// Actions //
	//
	// Add block
	addBlock(type: string, value: { [key: string]: any } = {}) {
		this.blockList.push({
			id: ++this.blockIdCounter,
			type: type,
			value: value
		});
	}
	//
	// Add image
	addImage(file: File, success: (image: ImageData) => void) {
		if (file && ImageTypes.includes(file.type)) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = (event) => {
				if (event.target) {
					let image = new Image();
					image.onload = () => {
						let data: ImageData = {
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
	//
	// Execute command
	execute(command: string, value: string | undefined = undefined) {
		document.execCommand(command, false, value);
	}
	//
	// Paste plain text
	pastePlainText(evenet: ClipboardEvent) {
		this.execute("insertHTML", evenet.clipboardData?.getData("text/plain") || "");
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
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-editor {
	display: flex;
	flex-direction: column;

	.editor-header {
		z-index: 1;
		flex-shrink: 0;
	}
	.blocks {
		position: relative;

		flex-grow: 1;
		overflow: hidden auto;
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
