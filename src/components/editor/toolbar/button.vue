<template>
	<app-button class="editor-toolbar-button" v-on="$listeners">
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
		required: true
	}) icon!: string;
	@Prop({
		type: String,
		required: true
	}) name!: string;
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-toolbar-button {
	flex-direction: column;
	gap: 8px;

	.name {
		font-size: small;
	}

	&:hover {
		color: $theme-color;
	}
}
</style>
