<template>
	<div :class="defaultClasses"></div>
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
	focus: boolean = false;

	onFocus() {
		this.focus = true;
	}
	onBlur() {
		this.focus = false;
	}

	onClickContainer() {
		(this.$refs["mainInput"] as HTMLElement).focus();
	}
	remove() {
		this.$emit("removeblock", this.id);
	}

	get defaultClasses(): { [key: string]: boolean } {
		let value: { [key: string]: boolean } = {};

		// Default type class
		value["editor-block"] = true;
		if (this.type != "block") value[`editor-block-${this.type}`] = true;

		// Is focus
		Object.assign(value, {
			"focus": this.focus
		});

		return value;
	}
}
</script>
