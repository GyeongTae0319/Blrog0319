<template>
	<div class="blog-frame">
		<blog-sidebar id="blogSidebar" />
		<router-view class="blog-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogSidebar from "@/components/BlogSidebar.vue";

@Component({
	components: { BlogSidebar }
})
export default class BlogFrame extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.blog-frame {
	display: flex;

	height: 100%;
	overflow: hidden;

	#blogSidebar {
		flex-shrink: 0;
	}
	.blog-contents {
		flex-grow: 1;
	}
}
</style>
