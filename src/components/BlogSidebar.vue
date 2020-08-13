<template>
	<div class="blog-sidebar">
		<blog-sidebar-profiles />
	</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
// Components //
import BlogSidebarProfiles from "@/components/BlogSidebarProfiles.vue";

@Options({
	components: { BlogSidebarProfiles }
})
export default class BlogSidebar extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.blog-sidebar {
	width: $sidebar-width;
	height: 100%;
	padding: 32px;

	background-color: $background-color-lv1;
}
</style>
