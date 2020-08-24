<template>
	<span class="app-image">
		<img
			v-show="isLoaded"
			:src="src"
			:alt="alt"
			:draggable="draggable"
			:referrerpolicy="referrerpolicy"
			class="image"
			v-on="eventListeners"
			:style="`object-fit: ${objectfit}`"
		>
		<app-content-placeholder v-if="!isLoaded" class="holder" />
	</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppContentPlaceholder from "@/components/app/content-placeholder.vue";

@Component({
	components: {
		AppContentPlaceholder
	}
})
export default class AppImage extends Vue {
	@Prop({
		type: String,
		required: true
	}) src!: string;
	@Prop({
		type: String,
		default: ""
	}) alt!: string;
	@Prop({
		type: String,
		default: "fill",
		validator: (value) => {
			return ["fill", "contain", "cover", "none", "scale-down"].includes(value);
		}
	}) objectfit!: string;
	@Prop({
		type: String,
		default: "true"
	}) draggable!: "true" | "false";
	@Prop({
		type: String,
		default: ""
	}) referrerpolicy!: string;

	isLoaded = false;

	get eventListeners() {
		return Object.assign({}, this.$listeners, {
			load: () => {
				this.isLoaded = true;
				this.$emit("load");
			},
			contextmenu: (event: MouseEvent) => {
				if (this.draggable == "false") event.preventDefault();
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.app-image {
	display: inline-block;
	overflow: hidden;

	* {
		width: 100%;
		height: 100%;
	}
}
</style>
