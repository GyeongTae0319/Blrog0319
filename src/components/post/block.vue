<template>
	<div class="blog-post-block"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PostBlock extends Vue {
	@Prop({
		type: Object,
		required: true
	}) block!: object;
}
</script>
