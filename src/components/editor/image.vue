<template>
	<div class="editor-image" v-on="$listeners">
		<app-image
			:src="image.value"
			:alt="image.alt"
			objectfit="cover"
			draggable="false"
		/>
		<app-button
			class="remove"
			@click="bus.$emit('removeimage', image.id)"
		>
			<i class="material-icons">remove</i>
		</app-button>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";
import AppButton from "@/components/app/button.vue";

@Component({
	components: { AppImage, AppButton }
})
export default class EditorImage extends Vue {
	@Prop({
		type: Object,
		required: true
	}) image!: { [kye: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-image {
	position: relative;

	width: 96px;
	height: 96px;

	border-radius: 8px;

	overflow: hidden;

	cursor: pointer;

	.app-image {
		width: 100%;
		height: 100%;
	}
	.remove {
		visibility: hidden;

		position: absolute;
		top: 4px;
		right: 4px;

		background-color: rgba(#000000, 0.5);

		&:hover {
			background-color: $theme-color;
		}
	}

	&:hover {
		border: 4px solid $theme-color;

		.app-image {
			width: 96px;
			height: 96px;
			margin: -4px;
		}
		.remove {
			visibility: visible;

			top: 0;
			right: 0;
		}
	}
}
</style>
