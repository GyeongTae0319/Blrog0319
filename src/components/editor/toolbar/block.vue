<template>
	<div class="editor-toolbar-block">
		<editor-toolbar-button
			v-for="(block, key) in blockList"
			:key="key"
			:icon="block.icon"
			:name="block.name"
			@click="bus.$emit('addblock', key)"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ToolbarButtonData } from "@/components/editor/toolbar.vue";
// Components //
import EditorToolbarButton from "@/components/editor/toolbar/button.vue";

@Component({
	components: { EditorToolbarButton }
})
export default class EditorToolbarBlock extends Vue {
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	blockList: { [key: string]: ToolbarButtonData } = {
		"subheading": {
			icon: "title",
			name: "소제목"
		},
		"paragraph": {
			icon: "notes",
			name: "문단"
		},
		"quote": {
			icon: "format_quote",
			name: "인용구"
		},
		"list": {
			icon: "format_list_bulleted",
			name: "목록"
		},
		"code": {
			icon: "code",
			name: "코드"
		},
		"image": {
			icon: "insert_photo",
			name: "사진"
		},
		"video": {
			icon: "videocam",
			name: "영상"
		},
		"horizontal-rule": {
			icon: "horizontal_rule",
			name: "구분선"
		},
		"table": {
			icon: "border_all",
			name: "표"
		},
		"calendar": {
			icon: "insert_invitation",
			name: "일정"
		},
		"link": {
			icon: "insert_link",
			name: "링크"
		},
		"file": {
			icon: "attach_file",
			name: "파일"
		}
	};
}
</script>

<style lang="scss" scoped>
.editor-toolbar-block {
	display: flex;
	height: 100%;
	padding: 0 16px;

	.editor-toolbar-button {
		width: 48px;
		height: 100%;
	}
}
</style>
