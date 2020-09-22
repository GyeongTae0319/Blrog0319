<template>
	<div class="editor-toolbar">
		<div class="top">
			<editor-toolbar-block :bus="bus" />
		</div>
		<div class="bottom">
			<editor-toolbar-text :bus="bus" />
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorToolbarBlock from "@/components/editor/toolbar/block.vue";
import EditorToolbarText from "@/components/editor/toolbar/text.vue";

export interface ToolbarButtonData {
	icon: string;
	name: string;
}

@Component({
	components: {
		EditorToolbarBlock,
		EditorToolbarText
	}
})
export default class EditorToolbar extends Vue {
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-toolbar {
	.top {
		display: flex;
		height: 64px;

		border-bottom: 1px solid $background-color-lv2;
	}
	.bottom {
		display: flex;
		height: 32px;

		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
