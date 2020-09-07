<template>
	<a
		v-if="type === 'link'"
		:href="to"
		class="app-button"
		v-on="$listeners"
	>
		<slot>열기</slot>
	</a>
	<router-link
		v-else-if="type === 'route'"
		:to="to"
		class="app-button"
		v-on="$listeners"
	>
		<slot>이동</slot>
	</router-link>
	<button
		v-else
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
			return ["button", "menu", "reset", "submit", "link", "route"].includes(value);
		}
	}) type!: "button" | "menu" | "reset" | "submit" | "link" | "route";
	@Prop({
		type: Boolean,
		default: false
	}) disabled!: boolean;
	@Prop({
		type: [String, Object],
		default: ""
	}) to!: string | object;
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
