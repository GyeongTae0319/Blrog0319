<template>
	<div
		:class="defaultClasses"
		@click="onClickContainer"
	>
		<div class="block">
			<div class="input id" @click.stop>
				<div
					contenteditable
					v-text="propId"
					class="content"
					@focus="onFocus"
					@blur="onBlur"
					@input="onInputId"
				/>
				<span v-if="blankId" class="placeholder">아이디</span>
			</div>
			<div class="input title">
				<h2
					contenteditable
					v-text="content"
					class="content"
					ref="mainInput"
					@focus="onFocus"
					@blur="onBlur"
					@input="onInputContent"
				/>
				<span v-if="blankContent" class="placeholder">소제목</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import EditorBlock from "@/components/editor/block/block.vue";
import { BlockSubheadingData } from '@/views/blog/editor.vue';

@Component
export default class EditorBlockSubheading extends EditorBlock<BlockSubheadingData> {
	type = "subheading";

	// Copy of props
	content: string = "";
	propId: string = "";

	created() {
		if (!(this.value.content && this.value.id)) {
			this.$set(this.value, "content", "");
			this.$set(this.value, "id", "");
		}
		this.content = this.value.content;
		this.propId = this.value.id;
	}

	onInputContent(event: InputEvent) {
		let value = (event.target as HTMLHeadingElement).innerText;
		this.$set(this.value, "content", value);
	}
	onInputId(event: InputEvent) {
		let value = (event.target as HTMLSpanElement).innerText;
		this.$set(this.value, "id", value);
	}

	get blankContent(): boolean {
		return this.value.content.replaceAll(/\s/g, "") == "";
	}
	get blankId(): boolean {
		return this.value.id.replaceAll(/\s/g, "") == "";
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-subheading {
	position: relative;

	padding: {
		top: 15px;
		bottom: 16px;
	}
}

.block {
	padding: 0 32px;
}
.input {
	&.title {
		font-size: x-large;
	}
	&.id {
		color: $text-color-white-desc;
		font-size: small;
	}
}
</style>
