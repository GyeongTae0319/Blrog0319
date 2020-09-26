<template>
	<div class="editor-toolbar-text-color">
		<editor-toolbar-button-icon
			icon="title"
			name="글자색"
			class="color-text"
		/>
		<editor-toolbar-button-icon
			icon="title"
			name="글자 배경색"
			class="color-back"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Component //
import EditorToolbarButtonIcon from "@/components/editor/toolbar/button-icon.vue";

@Component({
	components: { EditorToolbarButtonIcon }
})
export default class EditorToolbarTextColor extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-toolbar-text-color {
	position: relative;
}

.editor-toolbar-button-icon {
	position: relative;
	width: 32px;
	height: 100%;

	&.color-text::after {
		content: "";

		display: block;

		position: absolute;
		bottom: 3px;
		right: 4px;

		width: 6px;
		height: 6px;

		background-color: $text-color-white;
	}
	&.color-back::after {
		content: "";

		display: block;

		position: absolute;
		bottom: 3px;
		left: 4px;

		width: 20px;
		height: 20px;

		border: 2px solid $text-color-white;
	}

	&:hover {
		&.color-text::after {
			background-color: $theme-color;
		}
		&.color-back::after {
			border-color: $theme-color;
		}
	}
}
</style>
