<template>
	<editor-block-heading
		v-if="type === 'heading'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-subheading
		v-else-if="type === 'subheading'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-paragraph
		v-else-if="type === 'paragraph'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-quote
		v-else-if="type === 'quote'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-list
		v-else-if="type === 'list'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-image
		v-else-if="type === 'image'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-video
		v-else-if="type === 'video'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-horizontal-rule
		v-else-if="type === 'horizontal-rule'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-table
		v-else-if="type === 'table'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-calendar
		v-else-if="type === 'calendar'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-link
		v-else-if="type === 'link'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-file
		v-else-if="type === 'file'"
		:id="id"
		:value="value"
		:bus="bus"
	/>
	<editor-block-missing
		v-else
		:id="id"
		:value="value"
		:bus="bus"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorBlockHeading from "@/components/editor/block/heading.vue";
import EditorBlockSubheading from "@/components/editor/block/subheading.vue";
import EditorBlockParagraph from "@/components/editor/block/paragraph.vue";
import EditorBlockQuote from "@/components/editor/block/quote.vue";
import EditorBlockList from "@/components/editor/block/link.vue";
import EditorBlockImage from "@/components/editor/block/image.vue";
import EditorBlockVideo from "@/components/editor/block/video.vue";
import EditorBlockHorizontalRule from "@/components/editor/block/horizontal-rule.vue";
import EditorBlockTable from "@/components/editor/block/table.vue";
import EditorBlockCalendar from "@/components/editor/block/calendar.vue";
import EditorBlockLink from "@/components/editor/block/link.vue";
import EditorBlockFile from "@/components/editor/block/file.vue";
import EditorBlockMissing from "@/components/editor/block/missing.vue";

const types: string[] = [
	"heading",
	"subheading",
	"paragraph",
	"quote",
	"list",
	"image",
	"video",
	"horizontal-rule",
	"table",
	"calendar",
	"link",
	"file"
];

@Component({
	components: {
		EditorBlockHeading,
		EditorBlockSubheading,
		EditorBlockParagraph,
		EditorBlockQuote,
		EditorBlockList,
		EditorBlockImage,
		EditorBlockVideo,
		EditorBlockHorizontalRule,
		EditorBlockTable,
		EditorBlockCalendar,
		EditorBlockLink,
		EditorBlockFile,
		EditorBlockMissing
	}
})
export default class EditorPostBlock extends Vue {
	@Prop({
		type: Number,
		required: true
	}) id!: number;
	@Prop({
		type: String,
		default: types[0],
		validator: (value) => {
			return types.includes(value);
		}
	}) type!: string;
	@Prop({
		type: Object,
		default: () => {}
	}) value!: { [key: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>

</style>
