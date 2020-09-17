<template>
	<app-button-tag
		class="editor-text-toolbar-button"
		dir="down"
		@click.prevent="$emit('action', action)"
	>
		<i class="material-icons icon">{{ icon }}</i>
		<template #tag>{{ name }}</template>
	</app-button-tag>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppButtonTag from "@/components/app/button-tag.vue";

@Component({
	components: { AppButtonTag }
})
export default class EditorTextToolbarButton extends Vue {
	@Prop({
		type: String,
		required: true
	}) icon!: string;
	@Prop({
		type: String,
		required: true
	}) name!: string;
	@Prop({
		type: String,
		required: true
	}) action!: string;
}
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
