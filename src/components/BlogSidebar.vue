<template>
	<div class="blog-sidebar">
		<blog-sidebar-profiles />
		<hr>
		<blog-sidebar-categories />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogSidebarProfiles from "@/components/BlogSidebarProfiles.vue";
import BlogSidebarCategories from "@/components/BlogSidebarCategories.vue";

@Component({
	components: {
		BlogSidebarProfiles,
		BlogSidebarCategories
	}
})
export default class BlogSidebar extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.blog-sidebar {
	width: $sidebar-width;
	height: 100%;
	padding: 32px;

	background-color: $background-color-lv1;

	hr {
		width: 75%;
		margin: 32px auto;

		border-top: 1px solid $background-color-lv2;
	}
}
</style>
