<template>
	<div id="blogLayout">
		<header>
			HEADER
		</header>
		<div id="blogSidebar">
			<blog-profiles />
		</div>
		<nuxt class="contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BlogProfiles from "~/components/BlogProfiles.vue";

@Component({
	components: { BlogProfiles }
})
export default class BlogLayout extends Vue {}
</script>

<style lang="scss" scoped>
@import "./default";
</style>
