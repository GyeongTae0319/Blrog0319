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
		<app-button
			v-if="$store.getters.isAdmin"
			@click.stop="$router.push({ name: 'BlogWritePost' })"
			class="write-post"
		>글쓰기</app-button>
		<app-header-auth />
	</header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AppButton from "@/components/app/button.vue"
import AppHeaderAuth from "@/components/app/header/auth.vue";

@Component({
	components: { AppButton, AppHeaderAuth }
})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

// Header styles
.app-header {
	display: flex;
	align-items: center;

	position: relative;
	z-index: $z-index-header;

	width: 100%;
	height: $header-height;

	background-color: $background-color-lv1;
	box-shadow: 0 -8px 16px #000000;

	// Home link title
	.brand {
		display: flex;

		height: 100%;
		margin-right: auto;
		padding: 12px;

		align-items: center;

		.logo {
			height: 100%;
			margin-right: 16px;
		}
	}
	.write-post {
		margin-right: 8px;
		padding: 4px 12px;

		border: 1px solid $background-color-lv3;
		border-radius: 4px;

		transition: border-color 0.1s, background-color 0.1s;

		&:hover,
		&:focus {
			$hover-color: rgba($background-color-lv2, 0.5);

			border-color: $hover-color;
			background-color: $hover-color;
		}
	}
}
</style>
