<template>
	<div
		:class="defaultClasses"
		@click="onClickContainer"
		@keydown.ctrl.delete.exact.prevent="pressCtrlDelete"
	>
		<div class="block">
			<div class="input">
				<span
					contenteditable
					v-text="link"
					class="content"
					ref="mainInput"
					@focus="onFocus"
					@blur="onBlur"
					@input="onInput"
				/>
				<span v-if="blankLink" class="placeholder">링크</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BlockLinkData } from '@/views/blog/editor.vue';
import EditorBlock from '@/components/editor/block/block.vue';

@Component
export default class EditorBlockLink extends EditorBlock<BlockLinkData> {
	type = "link";

	link: string = "";

	created() {
		if (!this.value.url) {
			this.$set(this.value, "url", "");
		}
		this.link = this.value.url;
	}

	onInput(event: InputEvent) {
		let value = (event.target as HTMLSpanElement).innerText;
		this.$set(this.value, "url", value);
	}

	get blankLink(): boolean {
		return this.value.url.replaceAll(/\s/g, "") == "";
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-block-link {
	padding: 16px 0;

	.block {
		padding: 0 32px;

		.content {
			display: block;

			color: $theme-color;
		}
	}
}
</style>
