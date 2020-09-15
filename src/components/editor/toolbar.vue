<template>
	<div class="editor-toolbar">
		<editor-toolbar-button
			v-for="(data, key) in buttons"
			:key="key"
			:icon="data.icon"
			:name="data.name"
			:action="key"
			@action="(action) => { $emit('action', action) }"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorToolbarButton from "@/components/editor/toolbar-button.vue";

interface ToolbarButtonData {
	icon: string;
	name: string;
}

@Component({
	components: { EditorToolbarButton }
})
export default class EditorToolbar extends Vue {
	buttons: { [key: string]: ToolbarButtonData } = {
		"add-subheading": {
			icon: "title",
			name: "소제목"
		},
		"add-paragraph": {
			icon: "notes",
			name: "문단"
		},
		"add-quote": {
			icon: "format_quote",
			name: "인용구"
		},
		"add-list": {
			icon: "format_list_bulleted",
			name: "목록"
		},
		"add-image": {
			icon: "insert_photo",
			name: "사진"
		},
		"add-video": {
			icon: "videocam",
			name: "영상"
		},
		"add-horizontal-rule": {
			icon: "horizontal_rule",
			name: "구분선"
		},
		"add-table": {
			icon: "border_all",
			name: "표"
		},
		"add-calendar": {
			icon: "insert_invitation",
			name: "일정"
		},
		"add-link": {
			icon: "insert_link",
			name: "링크"
		},
		"add-file": {
			icon: "attach_file",
			name: "파일"
		}
	};
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.editor-toolbar {
	display: flex;
	padding: 0 16px;

	border-bottom: 1px solid $background-color-lv2;
}
</style>
