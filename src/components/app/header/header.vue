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
		<div v-if="$store.getters.isAdmin" class="admin">
			<app-button-tag
				type="route"
				:to="{ name: 'BlogPostEditor' }"
				dir="down"
				class="write-post"
			>
				<i class="material-icons icon">edit</i>
				<template #tag>글쓰기</template>
			</app-button-tag>
			<app-button-tag
				type="route"
				:to="{ name: 'AdminBasic' }"
				dir="down"
				class="settings"
			>
				<i class="material-icons icon">settings</i>
				<template #tag>블로그 관리</template>
			</app-button-tag>
		</div>
		<app-header-auth />
	</header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AppButtonTag from "@/components/app/button-tag.vue"
import AppHeaderAuth from "@/components/app/header/auth.vue";

@Component({
	components: { AppButtonTag, AppHeaderAuth }
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
	.admin {
		display: flex;
		gap: 8px;

		margin-right: 12px;

		> * {
			padding: 4px;

			border-radius: 4px;

			transition: background-color 0.1s;

			&:hover {
				background-color: $background-color-lv2;
			}
		}
	}
}
</style>
