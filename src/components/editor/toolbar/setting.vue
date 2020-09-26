<template>
	<div class="editor-toolbar-setting">
		<editor-toolbar-button
			icon="image"
			name="사진 목록"
			@click.prevent.stop="bus.$emit('showimagelist', true)"
		/>
		<editor-toolbar-button
			icon="article"
			name="발행"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorToolbarButton from "@/components/editor/toolbar/button.vue";

@Component({
	components: { EditorToolbarButton }
})
export default class EditorToolbarSetting extends Vue {
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>
.editor-toolbar-setting {
	display: flex;
	margin-left: auto;

	.editor-toolbar-button {
		width: 64px;
		height: 100%;
	}
}
</style>
