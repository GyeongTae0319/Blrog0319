<template>
	<div class="editor-block-link"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockLinkData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockLink extends EditorBlock<BlockLinkData> {}
</script>

<style lang="scss" scoped></style>
