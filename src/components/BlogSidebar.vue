<template>
	<div class="blog-sidebar">
		<blog-sidebar-profiles />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogSidebarProfiles from "@/components/BlogSidebarProfiles.vue";

@Component({
	components: { BlogSidebarProfiles }
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
}
</style>
