<template>
	<svg viewBox="0 0 50 50" :class="{
		'loading-spinner': true,
		show: show
	}">
		<circle
			cx="25"
			cy="25"
			r="20"
			fill="none"
			stroke-width="5"
			class="circle"
		/>
	</svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AppLoadingSpinner extends Vue {
	@Prop({
		type: Boolean,
		default: false
	}) show!: boolean;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes stretching {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}

.loading-spinner {
	display: inline-block;

	width: 32px;
	height: 32px;

	overflow: visible;

	animation: rotate 2s linear infinite;

	.circle {
		stroke: transparent;
		stroke-linecap: round;

		animation: stretching 1.5s ease-in-out infinite;
	}
	&.show .circle {
		stroke: $background-color-lv3;
	}
}
</style>
