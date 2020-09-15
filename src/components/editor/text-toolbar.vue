<template>
	<div class="editor-text-toolbar">
		<editor-text-toolbar-button
			v-for="(data, key) in buttons"
			:key="key"
			:icon="data.icon"
			:name="data.name"
			:action="key"
			@action="(action) => $emit('action', action)"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import EditorTextToolbarButton from "@/components/editor/text-toolbar-button.vue";

interface TextToolbarButtonData {
	icon: string;
	name: string;
}

@Component({
	components: { EditorTextToolbarButton }
})
export default class EditorTextToolbar extends Vue {
	buttons: { [key: string]: TextToolbarButtonData } = {
		"toggle-bold": {
			icon: "format_bold",
			name: "굵기"
		},
		"toggle-italic": {
			icon: "format_italic",
			name: "기울이기"
		},
		"toggle-underline": {
			icon: "format_underline",
			name: "밑줄"
		},
		"toggle-strikethrough": {
			icon: "format_strikethrough",
			name: "취소선"
		},
		"toggle-supscript": {
			icon: "subscript",
			name: "아래첨자"
		},
		"toggle-superscript": {
			icon: "superscript",
			name: "위첨자"
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-text-toolbar {
	display: flex;
	padding: 0 16px;

	border-bottom: 1px solid $background-color-lv2;
}
</style>
