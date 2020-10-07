<template>
	<div class="editor-block-image-object">
		<app-image
			:src="image.value"
			:alt="image.alt"
			draggable="false"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ImageData } from "@/views/blog/editor.vue";
// Components //
import AppImage from "@/components/app/image.vue";

@Component({
	components: { AppImage }
})
export default class EditorBlockImageObject extends Vue {
	@Prop({
		type: Object,
		required: true
	}) image!: ImageData;
}
</script>

<style lang="scss" scoped>
.editor-block-image-object {
	display: flex;
}
</style>
