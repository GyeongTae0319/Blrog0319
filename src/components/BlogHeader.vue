<template>
	<header class="blog-header">
		<router-link :to="{ name: 'BlogHome' }" class="brand">
			<img
				src="@/assets/icons/blrog_logo.svg"
				alt="Blrog 로고"
				class="logo"
			>
			<span class="title">Blrog: 블로의 블로그</span>
		</router-link>
		<blog-auth />
	</header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogAuth from "@/components/BlogAuth.vue";

@Component({
	components: { BlogAuth }
})
export default class BlogHeader extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

// Header styles
header {
	display: flex;

	position: absolute;
	z-index: 128;
	top: 0;
	left: 0;

	width: 100%;
	height: $header-height;

	justify-content: space-between;

	background-color: $background-color-lv1;
	box-shadow: 0 -8px 16px #000000;

	// Home link title
	.brand {
		display: flex;

		height: 100%;
		padding: 12px;

		align-items: center;

		.logo {
			height: 100%;
			margin-right: 16px;
		}
	}
}
</style>
