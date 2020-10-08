<template>
	<div
		:class="defaultClasses"
		@click="onClickContainer"
		@keydown.ctrl.delete.exact.prevent="pressCtrlDelete"
	>
		<div class="block">
			<div class="quote">
				<div class="input main">
					<div
						contenteditable
						v-text="content"
						class="content"
						ref="mainInput"
						@focus="onFocus"
						@blur="onBlur"
						@input="onInputContent"
					/>
					<span v-if="blankContent" class="placeholder">내용</span>
				</div>
				<div class="input source" @click.stop>
					<div
						contenteditable
						v-text="source"
						class="content"
						@focus="onFocus"
						@blur="onBlur"
						@input="onInputSource"
					/>
					<span v-if="blankSource" class="placeholder">출처</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockQuoteData } from "@/views/blog/editor.vue";
import EditorBlock from "@/components/editor/block/block.vue";

@Component
export default class EditorBlockQuote extends EditorBlock<BlockQuoteData> {
	type = "quote";

	// Copy of props
	content: string = "";
	source: string = "";
	url: string | null = null;

	created() {
		if (!(this.value.content && this.value.source && this.value.url)) {
			this.$set(this.value, "content", "");
			this.$set(this.value, "source", "");
			this.$set(this.value, "url", null);
		}
		this.content = this.value.content;
		this.source = this.value.source;
		this.url = this.value.url;
	}

	onInputContent(event: InputEvent) {
		let value = (event.target as HTMLDivElement).innerText;
		this.$set(this.value, "content", value);
	}
	onInputSource(event: InputEvent) {
		let value = (event.target as HTMLDivElement).innerText;
		this.$set(this.value, "source", value);
	}

	get blankContent(): boolean {
		return this.value.content.replaceAll(/\s/g, "") == "";
	}
	get blankSource(): boolean {
		return this.value.source.replaceAll(/\s/g, "") == "";
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-quote {
	padding: 16px 0;
}
.editor-block-subheading + .editor-block-quote,
.editor-block-paragraph + .editor-block-quote {
	padding-top: 0;
}

.block {
	padding: 0 32px;

	.quote {
		padding: 8px 16px;

		border: {
			left: 4px solid $background-color-lv2;
			radius: 4px;
		}
	}
}

.input {
	&.main {
		padding-bottom: 8px;

		font-size: large;
		white-space: pre-wrap;
	}
	&.source {
		color: $text-color-white-desc;
		font-size: small;
	}
}
</style>
