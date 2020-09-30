<template>
	<div class="editor-block-table"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockTableData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockTable extends EditorBlock<BlockTableData> {}
</script>

<style lang="scss" scoped></style>
