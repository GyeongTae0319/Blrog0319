<template>
	<div
		class="editor-block-subheading"
		@click="onClickContainer"
	>
		<div class="title">
			<h2
				contenteditable
				v-text="content"
				class="content"
				ref="mainInput"
				@input="onInputContent"
			></h2>
			<span v-if="blankContent" class="placeholder">소제목</span>
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

	// Copy of prop
	content: string = "";
	propId: string = "";

	created() {
		if (!(this.value.content && this.value.id)) {
			this.$set(this.value, "content", "");
			this.$set(this.value, "id", "");
		}
		this.content = this.value.content;
	}

	onInputContent(event: InputEvent) {
		let value = (event.target as HTMLHeadingElement).innerText;
		this.$set(this.value, "content", value);
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
	padding: {
		top: 32px;
		bottom: 16px;
	}
}

.title {
	position: relative;

	max-width: $post-width-max;
	margin: 0 auto;
	padding: 0 32px;

	font-size: xx-large;

	.content {
		width: 100%;
	}
	.placeholder {
		position: absolute;
		bottom: 0;
	}
}
</style>
