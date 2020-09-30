<template>
	<div class="editor-block-horizontal-rule"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockHorizontalRuleData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockHorizontalRule extends EditorBlock<BlockHorizontalRuleData> {}
</script>

<style lang="scss" scoped></style>
