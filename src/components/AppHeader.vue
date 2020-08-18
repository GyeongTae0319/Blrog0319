<template>
	<header class="app-header">
		<router-link :to="{ name: 'BlogHome' }" class="brand">
			<img
				src="@/assets/icons/blrog_logo.svg"
				alt="Blrog 로고"
				class="logo"
			>
			<span class="title">Blrog: 블로의 블로그</span>
		</router-link>
		<app-header-auth />
	</header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AppHeaderAuth from "@/components/AppHeaderAuth.vue";

@Component({
	components: { AppHeaderAuth }
})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

// Header styles
.app-header {
	display: flex;

	position: relative;
	z-index: $z-index-header;

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
