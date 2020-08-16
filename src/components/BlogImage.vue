<template>
	<span class="blog-image">
		<img
			v-show="isLoaded"
			:src="src"
			:alt="alt"
			:referrerpolicy="referrerpolicy"
			class="image"
			v-on="eventListeners"
		>
		<blog-content-placeholder v-if="!isLoaded" class="holder" />
	</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BlogImage extends Vue {
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
		default: ""
	}) referrerpolicy!: string;

	isLoaded = false;

	get eventListeners() {
		return Object.assign({}, this.$listeners, {
			load: () => {
				this.isLoaded = true;
				this.$emit("load");
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.blog-image {
	overflow: hidden;

	* {
		width: 100%;
		height: 100%;
	}
}
</style>
