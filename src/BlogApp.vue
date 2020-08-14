<template>
	<div id="blogApp">
		<blog-header id="blogHeader" />
		<blog-sidebar id="blogSidebar" />
		<router-view class="blog-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogHeader from "@/components/BlogHeader.vue";
import BlogSidebar from "@/components/BlogSidebar.vue";

@Component({
	components: { BlogHeader, BlogSidebar }
})
export default class BlogApp extends Vue {}
</script>

<style lang="scss">
@import "./assets/styles/variables";

// Reset default properties
*,
*::before,
*::after {
	margin: 0;
	padding: 0;

	border: none;
	outline: none;

	background: none;

	box-sizing: border-box;

	// Text styles
	color: inherit;
	font: inherit;
	text-decoration: none;

	// Touch highlight disable
	-webkit-tap-highlight-color: transparent;
	// Click and touch selection
	-webkit-touch-callout: inherit;
	  -webkit-user-select: inherit;
	   -khtml-user-select: inherit;
	     -moz-user-select: inherit;
	      -ms-user-select: inherit;
	          user-select: inherit;
}

// Set root element styles
html {
	background-color: $background-color;

	color: $text-color-white;
	font: {
		size: medium;
		family: 'Noto Sans KR', sans-serif;
	}

	// Click and touch selection disable
	-webkit-touch-callout: none;
	  -webkit-user-select: none;
	   -khtml-user-select: none;
	     -moz-user-select: none;
	      -ms-user-select: none;
	          user-select: none;
}
html,
body,
#blogApp {
	height: 100%;
	overflow: hidden;
}

#blogApp {
	display: flex;
	padding-top: $header-height;

	#blogSidebar {
		flex-shrink: 0;
	}
	> .blog-contents {
		flex-grow: 1;
	}
}
</style>
