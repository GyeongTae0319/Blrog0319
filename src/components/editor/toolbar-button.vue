<template>
	<app-button
		class="editor-toolbar-button"
		@click="$emit('action', action)"
	>
		<i class="material-icons icon">{{ icon }}</i>
		<span class="name">{{ name }}</span>
	</app-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";

@Component({
	components: { AppButton }
})
export default class EditorToolbarButton extends Vue {
	@Prop({
		type: String,
		required: true,
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

.editor-toolbar-button {
	display: flex;
	flex-direction: column;
	gap: 4px;

	width: 48px;
	height: 64px;

	.name {
		font-size: small;
	}

	&:hover {
		color: $theme-color;
	}
}
</style>
