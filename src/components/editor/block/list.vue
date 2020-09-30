<template>
	<div class="editor-block-list"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockListData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockList extends EditorBlock<BlockListData> {}
</script>

<style lang="scss" scoped></style>
