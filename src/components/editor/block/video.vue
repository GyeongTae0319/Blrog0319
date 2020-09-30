<template>
	<div class="editor-video-link"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockVideoData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockVideo extends EditorBlock<BlockVideoData> {}
</script>

<style lang="scss" scoped></style>
