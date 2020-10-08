<template>
	<div class="post-block-paragraph">
		<div class="block">
			<p v-html="value.value.content" />
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PostBlockParagraph extends Vue {
	@Prop({
		type: Object,
		required: true
	}) value!: { [key: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.post-block-paragraph {
	padding: 16px 0;

	.block {
		padding: 0 32px;
		
		p {
			color: $text-color-white-desc;
			white-space: pre-wrap;
		}
	}
}

.post-block-subheading + .post-block-paragraph,
.post-block-paragraph + .post-block-paragraph,
.post-block-quote + .post-block-paragraph {
	padding-top: 0;
}
</style>
