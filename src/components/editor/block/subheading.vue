<template>
	<div class="editor-block-subheading"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";

type BlockData = {
	text: string;
	id: string;
}

@Component
export default class EditorBlockSubheading extends EditorBlock {
	@Prop({
		type: Object,
		required: true,
		default: () => {}
	}) value!: {};
}
</script>

<style lang="scss" scoped></style>
