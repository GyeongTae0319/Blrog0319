<template>
	<div class="editor-block-subheading"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";
import { BlockSubheadingData } from '@/views/blog/editor.vue';

type BlockData = {
	text: string;
	id: string;
}

@Component
export default class EditorBlockSubheading extends EditorBlock<BlockSubheadingData> {}
</script>

<style lang="scss" scoped></style>
