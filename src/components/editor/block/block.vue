<template>
	<div class="editor-block"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditorBlock extends Vue {
	@Prop({
		type: Number,
		required: true
	}) id!: number;
	@Prop({
		type: Object,
		required: true,
	}) value!: { [key: string]: any };

	type: string = "block";

	onFocus() {
		this.$emit("focus", this.type);
	}
}
</script>

<style lang="scss" scoped>

</style>
