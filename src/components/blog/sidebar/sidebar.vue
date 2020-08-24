<template>
	<div class="blog-sidebar">
		<blog-sidebar-profile />
		<hr>
		<blog-sidebar-categories />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogSidebarProfile from "@/components/blog/sidebar/profile.vue";
import BlogSidebarCategories from "@/components/blog/sidebar/categories.vue";

@Component({
	components: {
		BlogSidebarProfile,
		BlogSidebarCategories
	}
})
export default class BlogSidebar extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.blog-sidebar {
	width: $sidebar-width;
	height: 100%;
	padding: $sidebar-padding;

	background-color: $background-color-lv1;

	hr {
		width: 75%;
		margin: 32px auto;

		border-top: 2px solid $background-color-lv2;
	}
}
</style>
