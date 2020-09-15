<template>
	<div class="editor-block"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

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

@Component
export default class EditorBlock extends Vue {
	@Prop({
		type: String,
		required: true,
		default: types[0],
		validator: (value) => {
			return types.includes(value);
		}
	}) type!: string;
}
</script>

<style lang="scss" scoped>

</style>
