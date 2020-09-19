<template>
	<div class="editor-header">
		<editor-toolbar :bus="bus" />
		<editor-text-toolbar :bus="bus" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorToolbar from "@/components/editor/toolbar.vue";
import EditorTextToolbar from "@/components/editor/text-toolbar.vue";

@Component({
	components: {
		EditorToolbar,
		EditorTextToolbar
	}
})
export default class EditorHeader extends Vue {
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	onAction(action: string) {
		this.bus.$emit("action", action);
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-header {
	background-color: $background-color;
}
</style>
