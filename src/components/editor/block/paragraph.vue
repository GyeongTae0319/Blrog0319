<template>
	<div
		class="editor-block-paragraph"
		contenteditable="true"
	>{{ content }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";
import { BlockParahraphData } from '@/views/blog/editor.vue';

interface BlockData {
	content: string;
};

@Component
export default class EditorBlockParagraph extends EditorBlock<BlockParahraphData> {
	content: string = "";

	created() {
		if (this.value.content === undefined) {
			this.content = this.value.content = "\n";
		}
	}

	@Watch("this.value.content", {
		immediate: true
	}) onChangeContent(value: string) {
		this.content = value;
	}
}
</script>

<style lang="scss" scoped></style>
