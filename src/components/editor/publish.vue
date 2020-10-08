<template>
	<div :class="classes">
		<label class="input">
			<span class="name">카테고리</span>
			<input
				type="text"
				v-model="cat"
				class="value"
				@input="onInputCategory"
			/>
		</label>
		<label class="input">
			<span class="name">글 아이디</span>
			<input
				type="text"
				v-model="id"
				class="value"
				@input="onInputId"
			/>
		</label>
		<label class="input">
			<span class="name">설명</span>
			<textarea
				v-model="desc"
				class="value"
				@input="onInputDesc"
			/>
		</label>
		<app-button
			class="submit"
			@click="bus.$emit('publish')"
		>발행</app-button>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue";

@Component({
	components: {
		AppButton
	}
})
export default class EditorPublish extends Vue {
	@Prop({
		type: String,
		required: true
	}) postid!: string;
	@Prop({
		type: String,
		required: true
	}) postdesc!: string;
	@Prop({
		type: String,
		required: true
	}) category!: string;
	@Prop({
		type: Vue,
		required: true,
	})
	bus!: Vue;

	id: string = "";
	desc: string = "";
	cat: string = "";

	show: boolean = false;

	created() {
		this.bus.$on("showpublish", (bool: boolean) => this.show = bool);

		this.id = "" + this.postid;
		this.desc = "" + this.postdesc;
		this.cat = "" + this.category;
	}

	onInputId() {
		this.$emit("update:postid", this.id);
	}
	onInputDesc() {
		this.$emit("update:postdesc", this.desc);
	}
	onInputCategory() {
		this.$emit("update:category", this.cat);
	}

	get classes() {
		return {
			"editor-publish": true,
			"show": this.show
		};
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-publish {
	display: flex;
	flex-direction: column;
	gap: 24px;

	opacity: 0;

	position: fixed;
	z-index: 8;
	top: $header-height + 32px;
	right: 64px;

	width: 512px;
	padding: 32px;

	border-radius: 16px;

	background-color: $background-color-lv1;

	box-shadow: 0 0px 16px rgba(#000000, 0.25);

	transition: opacity 0.2s, top 0.2s;

	pointer-events: none;

	&.show {
		opacity: 1;
		top: $header-height + 64px;

		pointer-events: all;
	}
}

.input {
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex-shrink: 0;

	.value {
		padding-bottom: 4px;
		border-bottom: 2px solid rgba($background-color-lv2, 0.5);
		transition: border-color 0.1s;

		&:focus {
			border-color: $background-color-lv3;
		}
	}
	textarea.value {
		resize: none;
		padding: 4px;
		border: 2px solid rgba($background-color-lv2, 0.5);
	}
}

.submit {
	align-self: flex-end;

	padding: 6px 16px;

	border: 1px solid rgba($background-color-lv2, 0.5);
	border-radius: 6px;

	transition: background-color 0.1s;

	&:hover {
		background-color: rgba($background-color-lv2, 0.5);
	}
}
</style>
