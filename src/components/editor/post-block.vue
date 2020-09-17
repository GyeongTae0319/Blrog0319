<template>
	<editor-block-paragraph
		v-if="type === 'paragraph'"
		:value="value"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import EditorBlockParagraph from "@/components/editor/block/paragraph.vue";

const types: string[] = [
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
		EditorBlockParagraph
	}
})
export default class EditorPostBlock extends Vue {
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
