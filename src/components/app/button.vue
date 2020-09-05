<template>
	<button
		:disabled="disabled"
		:type="type"
		class="app-button"
		v-on="$listeners"
	>
		<slot>버튼</slot>
	</button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AppButton extends Vue {
	@Prop({
		type: String,
		default: "button",
		validator: (value) => {
			return ["button", "menu", "reset", "submit"].includes(value);
		}
	}) type!: string;
	@Prop({
		type: Boolean,
		default: false
	}) disabled!: boolean;
}
</script>

<style lang="scss" scoped>
.app-button {
	display: flex;

	width: fit-content;
	height: fit-content;

	justify-content: center;
	align-items: center;

	cursor: pointer;
}
</style>
