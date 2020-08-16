<template>
	<div class="blog-category-edit-popup" @click.stop="$emit('close')">
		<div class="popup" @click.stop>
			<div class="header">
				<span class="title">카테고리 수정</span>
				<button class="close" @click.stop="$emit('close')">
					<i class="material-icons icon">close</i>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogCategoryEditPopup extends Vue {
	closePopup() {
		this.$emit('close');
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.blog-category-edit-popup {
	display: flex;

	position: fixed;
	z-index: 512;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;

	background-color: rgba(0, 0, 0, 0.25);

	justify-content: center;
	align-items: center;

	.popup {
		width: 512px;
		padding: 32px;

		border-radius: 16px;

		background-color: $background-color-lv1;

		.header {
			display: flex;

			justify-content: space-between;
			align-items: center;

			height: 32px;

			.title {
				font-weight: bold;
			}
			.close {
				height: 100%;
				padding: 4px;

				cursor: pointer;
			}
		}
	}
}
</style>
