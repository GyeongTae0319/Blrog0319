<template>
	<div class="editor-block"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditorBlock<T> extends Vue {
	@Prop({
		type: Number,
		required: true
	}) id!: number;
	@Prop({
		type: Object,
		required: true,
	}) value!: T;
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	type: string = "block";

	onFocus() {
		this.$emit("focusblock", this.type);
	}
	onBlur() {
		this.$emit("blurblock", this.type);
	}
	onClickContainer() {
		(this.$refs["mainInput"] as HTMLElement).focus();
	}
	remove() {
		this.$emit("removeblock", this.id);
	}
}
</script>
