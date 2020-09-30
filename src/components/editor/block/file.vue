<template>
	<div class="editor-block-file"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockFileData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockFile extends EditorBlock<BlockFileData> {}
</script>

<style lang="scss" scoped></style>
