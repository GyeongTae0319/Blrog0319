<template>
	<div class="editor-block-missing"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockMissingData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockMissing extends EditorBlock<BlockMissingData> {}
</script>

<style lang="scss" scoped></style>
