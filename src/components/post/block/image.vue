<template>
	<div :class="['post-block-image', value.value.size]">
		<div class="block">
			<app-image
				v-for="(image, index) in imageList"
				:key="`${index}_${image}`"
				:alt="image.alt"
				draggable="false"
				objectfit="cover"
				:src="image.value"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";
import { ImageData } from '@/views/blog/editor.vue';

@Component({
	components: {
		AppImage
	}
})
export default class PostBlockImage extends Vue {
	@Prop({
		type: Object,
		required: true
	}) value!: { [key: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	imageList: ImageData[] = [];

	created() {
		for (let i = 0; i < this.value.value.value.length; i++) {
			this.bus.$emit("getimage", this.value.value.value[i], (image: ImageData) => {
				this.imageList[i] = image;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.block {
	display: flex;
	gap: 4px;

	&.screen {
		max-width: 100% !important;
	}
}
</style>
