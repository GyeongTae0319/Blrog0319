<template>
	<div :class="{
		'editor-block-heading': true,
		'no-banner': blankBanner
	}">
		<app-image
			v-if="!blankBanner"
			:src="value.banner"
			objectfit="cover"
			class="banner"
		/>
		<div class="title">
			<input
				type="text"
				v-model="value.title"
				class="content"
			>
			<span v-if="blankTitle" class="placeholder">제목</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue , Component } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";
import EditorBlock from '@/components/editor/block/block.vue';

@Component({
	components: { AppImage }
})
export default class EditorBlockHeading extends EditorBlock {
	get blankTitle() {
		return this.value.title.replace(/\s/, "") == "";
	}
	get blankBanner() {
		return this.value.banner == null;
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-heading {
	position: relative;

	width: 100%;
	height: 300px;

	.app-image {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}
	.title {
		display: flex;
		align-items: flex-end;

		position: relative;

		max-width: 900px;
		height: 100%;
		margin: 0 auto;
		padding: 16px 0;

		font-size: xx-large;

		.content {
			position: absolute;

			width: 100%;
		}
		.placeholder {
			color: $text-color-white-disable;
		}
	}

	&.no-banner {
		height: 201px;

		border-bottom: 1px solid $background-color-lv2;
	}
}
</style>
