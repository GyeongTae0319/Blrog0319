<template>
	<button
		:disabled="disabled"
		:type="type"
		v-on="$listeners"
		:class="`app-button app-button-tag ${dir}`"
	>
		<slot>버튼</slot>
		<span class="tag">
			<slot name="tag"></slot>
		</span>
	</button>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";

@Component
export default class AppButtonTag extends AppButton {
	@Prop({
		type: String,
		default: "up",
		validator: (value) => {
			return ["up", "right", "down", "left"].includes(value);
		}
	}) dir!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.app-button-tag {
	$tag-leg-gap: 6px;

	display: flex;
	position: relative;

	width: fit-content;
	height: fit-content;

	justify-content: center;
	align-items: center;

	cursor: pointer;

	&:hover .tag {
		--gap: 16px;

		opacity: 1;
		pointer-events: inherit;
	}
	&.up .tag {
		bottom: calc(100% + var(--gap));

		&::before {
			bottom: -$tag-leg-gap;
		}
	}
	&.right .tag {
		left: calc(100% + var(--gap));

		&::before {
			left: -$tag-leg-gap;
		}
	}
	&.down .tag {
		top: calc(100% + var(--gap));

		&::before {
			top: -$tag-leg-gap;
		}
	}
	&.left .tag {
		right: calc(100% + var(--gap));

		&::before {
			right: -$tag-leg-gap;
		}
	}
	.tag {
		--gap: 12px;

		display: flex;
		opacity: 0;

		position: absolute;
		z-index: $z-index-popup;

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
		transition: top 0.1s, opacity 0.1s, right 0.1s, opacity 0.1s, bottom 0.1s, opacity 0.1s, left 0.1s, opacity 0.1s;

		&::before {
			content: "";

			display: inline-block;

			position: absolute;
			z-index: -1;

			width: 12px;
			height: 12px;

			background-color: $background-color-lv2;

			transform: rotate(45deg);
		}
	}
}
</style>
