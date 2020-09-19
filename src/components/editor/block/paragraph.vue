<template>
	<div
		class="editor-block-paragraph"
		contenteditable="true"
	>{{ content }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";
import { component } from 'vue/types/umd';

interface BlockData {
	content: string;
};

@Component
export default class EditorBlockParagraph extends EditorBlock {
	@Prop({
		type: Object,
		required: true
	}) value!: BlockData

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
