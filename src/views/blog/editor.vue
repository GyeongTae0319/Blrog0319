<template>
	<div
		class="blog-editor"
		@paste.prevent="pastePlainText"
		@keydown.enter.exact.prevent="onEnter"
		@keydown.shift.enter.exact.prevent="onEnter"
		@keydown.ctrl.b.exact.prevent="format('bold')"
		@keydown.ctrl.i.exact.prevent="format('italic')"
		@keydown.ctrl.u.exact.prevent="format('underline')"
	>
		<editor-header :bus="bus" class="header" />
		<div class="contents">
			<div class="blocks">
				<editor-post-block
					v-for="(block, index) in blocks"
					:key="`${index}_${block.type}`"
					:type="block.type"
					:value="block.value"
				/>
			</div>
			<div class="sidebar"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import EditorHeader from "@/components/editor/header.vue";
import EditorPostBlock from "@/components/editor/post-block.vue";
import EditorBlock from '@/components/editor/block/block.vue';

interface PostBlock {
	type: string;
	value: { [key: string]: any };
}

class EditorVue extends Vue {
	selected: number = 0;
}

@Component({
	components: {
		EditorHeader,
		EditorPostBlock
	}
})
export default class BlogEditor extends Vue {
	bus: EditorVue = new EditorVue();
	blocks: PostBlock[] = [];
	images: string[] = [];

	created() {
		this.bus.$on("action", this.onAction);
	}

	// Actions //
	onAction(action: string, value: string) {
		if (action.startsWith("add-")) {
			this.onAdd(action.slice("add-".length));
		} else if (action.startsWith("format-")) {
			this.format(action.slice("toggle-".length), value || undefined);
		}
	}
	// Add block
	onAdd(type: string) {
		console.log(`ADD: ${type}`);
		this.blocks.push({
			type: type,
			value: {
				content: "HELLO WORLD!"
			}
		});
	}
	// Toggle text styles
	format(command: string, value: string | undefined = undefined) {
		document.execCommand(command, false, value);
	}
	onEnter(event: KeyboardEvent) {
		let selection = window.getSelection();
		if (selection == null) return;

		let text = "\n";
		if (selection.focusOffset == selection.focusNode?.nodeValue?.length) {
			text += "\n";
		}
		this.format("insertHTML", text);
	}
	pastePlainText(evenet: ClipboardEvent) {
		this.format("insertHTML", evenet.clipboardData?.getData("text/plain") || "");
	}
	
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-editor {
	padding-top: 98px;
}

.header {
	position: fixed;
	top: $header-height;
	left: 0;

	width: 100%;
}

.contents {
	display: flex;
	height: 100%;

	.blocks {
		flex-grow: 1;
	}
	.sidebar {
		width: 300px;
		height: 100%;

		background-color: $background-color-lv1;
	}
}

.blocks {
	height: 100%;
	overflow: hidden auto;

	&::v-deep [class|="editor-block"] {
		padding: 30px;

		border: 2px solid transparent;

		white-space: pre-wrap;

		// transition: border-color 0.1s;

		b {
			font-weight: bold;
		}
		i {
			font-style: italic;
		}
		u {
			text-decoration: underline;
		}
		strike {
			text-decoration: line-through;
		}
		sub,
		sup {
			font-size: small;
		}

		&:hover {
			border-color: rgba($theme-color, 0.5);
		}
		&:focus {
			border-color: $theme-color;
		}
	}
}
</style>
