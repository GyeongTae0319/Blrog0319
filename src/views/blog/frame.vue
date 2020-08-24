<template>
	<div class="blog-frame">
		<blog-sidebar />
		<router-view class="blog-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogSidebar from "@/components/blog/sidebar/sidebar.vue";

@Component({
	components: { BlogSidebar }
})
export default class BlogFrame extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-frame {
	display: flex;

	height: 100%;
	overflow: hidden;

	.blog-sidebar {
		flex-shrink: 0;
		overflow: hidden auto;
	}
	.blog-contents {
		flex-grow: 1;
		overflow: hidden auto;
	}
}
</style>
