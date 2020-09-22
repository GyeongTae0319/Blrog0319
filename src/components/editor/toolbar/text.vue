<template>
	<div class="editor-toolbar-text">
		<div class="text-format">
			<editor-toolbar-button-icon
				v-for="(button, key) in formatList"
				:key="key"
				:icon="button.icon"
				:name="button.name"
				@click.prevent.stop="bus.$emit('execute', key)"
			/>
		</div>
		<hr>
		<div class="bind">
			<editor-toolbar-button-icon
				v-for="(button, key) in bindList"
				:key="key"
				:icon="button.icon"
				:name="button.name"
				@click.prevent.stop="bus.$emit('bind', key)"
			/>
		</div>
		<hr>
		<div class="align">
			<editor-toolbar-button-icon
				v-for="(button, key) in alignList"
				:key="key"
				:icon="button.icon"
				:name="button.name"
				@click.prevent.stop="bus.$emit('execute', key)"
			/>
		</div>
		<hr>
		<editor-toolbar-button-icon
			icon="format_clear"
			name="초기화"
			@click.prevent.stop="bus.$emit('execute', 'removeFormat')"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ToolbarButtonData } from "@/components/editor/toolbar.vue";
// Components //
import EditorToolbarButtonIcon from "@/components/editor/toolbar/button-icon.vue";

@Component({
	components: { EditorToolbarButtonIcon }
})
export default class EditorToolbarText extends Vue {
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;

	formatList: { [key: string]: ToolbarButtonData } = {
		"bold": {
			icon: "format_bold",
			name: "굵기"
		},
		"italic": {
			icon: "format_italic",
			name: "기울이기"
		},
		"underline": {
			icon: "format_underline",
			name: "밑줄"
		},
		"strikeThrough": {
			icon: "format_strikethrough",
			name: "취소선"
		},
		"superscript": {
			icon: "superscript",
			name: "위첨자"
		},
		"subscript": {
			icon: "subscript",
			name: "아래첨자"
		}
	};
	bindList: { [key: string]: ToolbarButtonData } = {
		"code": {
			icon: "code",
			name: "코드"
		}
	}
	alignList: { [key: string]: ToolbarButtonData } = {
		"justifyLeft": {
			icon: "format_align_left",
			name: "왼쪽 정렬"
		},
		"justifyCenter": {
			icon: "format_align_center",
			name: "가운데 정렬"
		},
		"justifyRight": {
			icon: "format_align_right",
			name: "오른쪽 정렬"
		},
		"justifyFull": {
			icon: "format_align_justify",
			name: "양끝 정렬"
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.editor-toolbar-text {
	display: flex;
	height: 100%;
	padding: 0 16px;

	hr {
		height: 75%;
		margin: 0 4px;

		align-self: center;

		border-right: 1px solid $background-color-lv2;
	}

	> div {
		display: flex;
	}
	.editor-toolbar-button-icon {
		width: 32px;
		height: 100%;
	}
}
</style>
