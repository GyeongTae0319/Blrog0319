<template>
	<button
		:disabled="disabled"
		:type="type"
		v-on="$listeners"
		class="app-button app-button-tag"
	>
		<slot>버튼</slot>
		<span class="tag">
			<slot name="tag"></slot>
		</span>
	</button>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";

@Component
export default class AppButtonTag extends AppButton {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.app-button-tag {
	display: flex;
	position: relative;

	width: fit-content;
	height: fit-content;

	justify-content: center;
	align-items: center;

	cursor: pointer;

	&:hover .tag,
	&:focus .tag {
		--gap: 16px;

		opacity: 1;
		pointer-events: inherit;
	}
	.tag {
		--gap: 12px;

		display: flex;
		opacity: 0;

		position: absolute;
		z-index: $z-index-popup;
		bottom: calc(100% + var(--gap));

		width: max-content;
		padding: 8px 12px;

		border-radius: 8px;

		background-color: $background-color-lv2;

		justify-content: center;
		align-items: center;

		color: $text-color-white-desc;
		font-size: small;

		pointer-events: none;

		filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.375));
		transition: bottom 0.1s, opacity 0.1s;

		&::before {
			content: "";

			display: inline-block;

			position: absolute;
			z-index: -1;
			bottom: -8px;

			width: 16px;
			height: 16px;

			background-color: $background-color-lv2;

			transform: rotate(45deg);
		}
	}
}
</style>
