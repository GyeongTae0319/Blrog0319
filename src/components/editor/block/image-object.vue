<template>
	<div class="editor-block-image-object">
		<app-image
			:src="image.value"
			:alt="image.alt"
			draggable="false"
		/>
		<div class="control">
			<app-button-tag
				class="remove-iamge"
				@click="$emit('remove')"
			>
				<i class="material-icons">delete</i>
				<template #tag>지우기</template>
			</app-button-tag>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ImageData } from "@/views/blog/editor.vue";
// Components //
import AppImage from "@/components/app/image.vue";
import AppButtonTag from "@/components/app/button-tag.vue";

@Component({
	components: {
		AppImage,
		AppButtonTag
	}
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
	position: relative;
}

.control {
	display: flex;
	gap: 8px;

	position: absolute;
	bottom: 8px;
	right: 8px;

	padding: 8px;

	background-color: rgba(#000000, 0.5);
}
</style>
