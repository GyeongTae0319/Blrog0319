<template>
	<div class="editor-block-calendar"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockCalendarData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockCalendar extends EditorBlock<BlockCalendarData> {}
</script>

<style lang="scss" scoped></style>
