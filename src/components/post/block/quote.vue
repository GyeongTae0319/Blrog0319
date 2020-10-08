<template>
	<div class="post-block-quote">
		<div class="block">
			<div class="quote">
				<div v-html="value.value.content" class="content" />
				<span v-text="value.value.source" class="source" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PostBlockQuote extends Vue {
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

.post-block-quote {
	padding: 16px 0;
}
.post-block-subheading + .post-block-quote,
.post-block-paragraph + .postr-block-quote {
	padding-top: 0;
}

.block {
	padding: 0 32px;

	.quote {
		padding: 8px 16px;

		border: {
			left: 4px solid $background-color-lv2;
			radius: 4px
		}

		.content {
			font-size: large;
			white-space: pre-wrap;
		}
		.source {
			color: $text-color-white-desc;
			font-size: small;
		}
	}
}
</style>
