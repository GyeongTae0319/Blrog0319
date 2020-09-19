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
				v-for="block in blocks"
				:key="block.id"
				:id="block.id"
				:type="block.type"
				:value="block.value"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import EditorHeader from "@/components/editor/header.vue";
import EditorPostBlock from "@/components/editor/post-block.vue";

interface PostBlock {
	id: number;
	type: string;
	value: { [key: string]: any };
}

@Component({
	components: {
		EditorHeader,
		EditorPostBlock
	}
})
export default class BlogEditor extends Vue {
	editorVue: Vue = new Vue();
	blocks: PostBlock[] = [];
	images: string[] = [];
	title: string = "";
	banner: number | null = null;
	blockIdCounter = 0;

	created() {
		this.editorVue.$on("addblock", this.addBlock);
		this.editorVue.$on("execute", this.execute);

		this.addBlock("heading", {
			title: this.title,
			banner: this.banner
		});
	}

	// Actions //
	//
	// Add block
	addBlock(type: string, value: { [key: string]: any } = {}) {
		this.blocks.push({
			id: ++this.blockIdCounter,
			type: type,
			value: value
		});
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
		flex-shrink: 0;
	}
}

.contents {
	display: flex;
	flex-grow: 1;
}

.blocks {
	height: 100%;
	overflow: hidden auto;
}
</style>
