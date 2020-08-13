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
		<button class="login" @click="login()">로그인</button>
	</header>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as firebase from "firebase/app";
import { provider } from "@/main";

@Options({})
export default class BlogHeader extends Vue {
	login = () => {
		firebase.auth().signInWithPopup(provider)
			.then((result) => {
				console.log(result);
			}).catch((error) => {
				console.log(error);
			});
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

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
	.login {
		height: fit-content;
		margin-right: 16px;
		padding: 4px 8px;

		border-radius: 4px;

		background-color: $background-color-lv2;

		align-self: center;

		cursor: pointer;
	}
}
</style>
