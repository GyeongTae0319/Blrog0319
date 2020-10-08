<template>
	<div :class="classes">
		<template v-if="!blankBanner">
			<app-image
				:src="banner.value"
				objectfit="cover"
				draggable="false"
				class="banner"
			/>
			<div class="image-overlay"/>
		</template>
		<div class="block">
			<h1 class="title">{{ value.value.title }}</h1>
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
export default class PostBlockHeading extends Vue {
	@Prop({
		type: Object,
		required: true
	}) value!: { [key: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	banner: ImageData | null = null;

	created() {
		this.bus.$emit("getimage", this.value.value.banner, (img: ImageData) => {
			this.banner = img;
		});
	}

	get classes() {
		return {
			"post-block-heading": true,
			"no-banner": this.blankBanner
		};
	}
	get blankBanner() {
		return this.value.banner < 0 && this.banner != null;
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.post-block-heading {
	position: relative;
	width: 100%;
	height: 300px;

	.block {
		height: 100%;
		font-size: xxx-large;

		.title {
			position: absolute;
			bottom: 16px;

			width: 100%;
			padding: 0 32px;
		}
	}
	.app-image {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		object-position: center;
	}
	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: linear-gradient(
			transparent 25%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}

	&.no-banner {
		height: 201px;
		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
