<template>
	<div class="editor-toolbar">
		<div class="add-block">
			<editor-toolbar-button
				v-for="(data, key) in blocks"
				:key="key"
				:icon="data.icon"
				:name="data.name"
				@click="bus.$emit('addblock', key)"
			/>
		</div>
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
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	blocks: { [key: string]: ToolbarButtonData } = {
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
@import "../../assets/styles/variables";

.editor-toolbar {
	display: flex;
	padding: 0 16px;

	border-bottom: 1px solid $background-color-lv2;

	.add-block {
		display: flex;

		margin-right: auto;
	}
}
</style>
