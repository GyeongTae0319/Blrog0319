<template>
	<div
		class="editor-block-paragraph"
		@click="onClickContainer"
	>
		<div class="paragraph">
			<p
				contenteditable
				v-html="content"
				class="content"
				ref="mainInput"
				@input="onInput"
			></p>
			<span v-if="blankContent" class="placeholder">본문</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";
import { BlockParahraphData } from '@/views/blog/editor.vue';

interface BlockData {
	content: string;
};

@Component
export default class EditorBlockParagraph extends EditorBlock<BlockParahraphData> {
	type = "paragraph";

	// Copy of prop
	content: string = "";

	created() {
		if (!this.value.content) {
			this.$set(this.value, "content", "");
		}
		this.content = this.value.content;
	}
 
	onInput(event: InputEvent) {
		let value = (event.target as HTMLParagraphElement).innerHTML;
		this.$set(this.value, "content", value);
	}

	get blankContent(): boolean {
		return this.value.content.replaceAll(/\s/g, "") == "";
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-paragraph {
	padding: 16px 0;

	.paragraph {
		position: relative;

		max-width: $post-width-max;
		margin: 0 auto;
		padding: 0 32px;

		.content {
			width: 100%;
			min-height: 1em;

			white-space: pre;
		}
		.placeholder {
			position: absolute;
			top: 0;
		}
	}
}

.editor-block-subheading + .editor-block-paragraph,
.editor-block-paragraph + .editor-block-paragraph {
	padding-top: 0;
}
</style>
