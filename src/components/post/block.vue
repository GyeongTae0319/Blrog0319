<template>
	<post-block-heading
		v-if="block.type === 'heading'"
		:value="block"
		:bus="bus"
	/>
	<post-block-subheading
		v-else-if="block.type === 'subheading'"
		:value="block"
		:bus="bus"
	/>
	<post-block-paragraph
		v-else-if="block.type === 'paragraph'"
		:value="block"
		:bus="bus"
	/>
	<post-block-quote
		v-else-if="block.type === 'quote'"
		:value="block"
		:bus="bus"
	/>
	<post-block-image
		v-else-if="block.type === 'image'"
		:value="block"
		:bus="bus"
	/>
	<post-block-link
		v-else-if="block.type === 'link'"
		:value="block"
		:bus="bus"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import PostBlockHeading from "@/components/post/block/heading.vue";
import PostBlockSubheading from "@/components/post/block/subheading.vue";
import PostBlockParagraph from "@/components/post/block/paragraph.vue";
import PostBlockQuote from "@/components/post/block/quote.vue";
import PostBlockImage from "@/components/post/block/image.vue";
import PostBlockLink from "@/components/post/block/link.vue";

@Component({
	components: {
		PostBlockHeading,
		PostBlockSubheading,
		PostBlockParagraph,
		PostBlockQuote,
		PostBlockImage,
		PostBlockLink
	}
})
export default class PostBlock extends Vue {
	@Prop({
		type: Object,
		required: true
	}) block!: object;
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>
