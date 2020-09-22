<template>
	<app-button-tag
		dir="down"
		class="editor-toolbar-button-icon"
		v-on="$listeners"
	>
		<i class="material-icons">{{ icon }}</i>
		<template #tag>{{ name }}</template>
	</app-button-tag>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import EditorToolbarButton from "@/components/editor/toolbar/button.vue";
// Component //
import AppButtonTag from "@/components/app/button-tag.vue";

@Component({
	components: { AppButtonTag }
})
export default class EditorToolbarButtonIcon extends EditorToolbarButton {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-toolbar-button-icon:hover {
	color: $theme-color;
}
</style>
