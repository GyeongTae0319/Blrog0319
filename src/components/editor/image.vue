<template>
	<div class="editor-image" v-on="$listeners">
		<app-image
			:src="image.value"
			:alt="image.alt"
			objectfit="cover"
			draggable="false"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";

@Component({
	components: { AppImage }
})
export default class EditorImage extends Vue {
	@Prop({
		type: Object,
		required: true
	}) image!: { [kye: string]: any };
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-image {
	width: 96px;
	height: 96px;

	border-radius: 8px;

	overflow: hidden;

	cursor: pointer;

	.app-image {
		width: 100%;
		height: 100%;
	}

	&:hover {
		border: 4px solid $theme-color;

		.app-image {
			width: 96px;
			height: 96px;
			margin: -4px;
		}
	}
}
</style>
