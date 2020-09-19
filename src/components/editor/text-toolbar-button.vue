<template>
	<app-button-tag
		class="editor-text-toolbar-button"
		dir="down"
		@click.prevent="$emit(action, value)"
	>
		<i class="material-icons icon">{{ icon }}</i>
		<template #tag>{{ name }}</template>
	</app-button-tag>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppButtonTag from "@/components/app/button-tag.vue";
import EditorToolbarButton from '@/components/editor/toolbar-button.vue';

@Component({
	components: { AppButtonTag }
})
export default class EditorTextToolbarButton extends EditorToolbarButton {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-text-toolbar-button {
	width: 32px;
	height: 32px;

	&:hover {
		color: $theme-color;
	}
}
</style>
