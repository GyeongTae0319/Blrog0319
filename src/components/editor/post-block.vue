<template>
	<editor-block-heading
		v-if="type === 'heading'"
		:id="id"
		:value="value"
	/>
	<editor-block-subheading
		v-else-if="type === 'subheading'"
		:id="id"
		:value="value"
	/>
	<editor-block-paragraph
		v-else-if="type === 'paragraph'"
		:id="id"
		:value="value"
	/>
	<editor-block-quote
		v-else-if="type === 'quote'"
		:id="id"
	/>
	<editor-block-list
		v-else-if="type === 'list'"
		:id="id"
	/>
	<editor-block-image
		v-else-if="type === 'image'"
		:id="id"
	/>
	<editor-block-video
		v-else-if="type === 'video'"
		:id="id"
	/>
	<editor-block-horizontal-rule
		v-else-if="type === 'horizontal-rule'"
		:id="id"
	/>
	<editor-block-table
		v-else-if="type === 'table'"
		:id="id"
	/>
	<editor-block-calendar
		v-else-if="type === 'calendar'"
		:id="id"
	/>
	<editor-block-link
		v-else-if="type === 'link'"
		:id="id"
	/>
	<editor-block-file
		v-else-if="type === 'file'"
		:id="id"
	/>
	<editor-block-missing
		:id="id"
		v-else
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
}
</script>

<style lang="scss" scoped>

</style>
