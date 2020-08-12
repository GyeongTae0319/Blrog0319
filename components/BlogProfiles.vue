<template>
	<div class="blog-profiles">
		<span class="profiles-image"></span>
		<div class="name">
			<span class="nick">Blro</span>
			<span class="origin">강경태</span>
		</div>
		<p class="description">
			게임 개발과 웹 개발을 하는 마인크래프트 플레이어, 블로의 개발/게임 블로그입니다 :D
		</p>
		<div class="links">
			<a
				href="mailto:gyeongtae020319@gmail.com"
				target="_blank"
				class="link email"
			>
				<i class="material-icons icon">email</i>
			</a>
			<a
				href="https://github.com/GyeongTae0319"
				target="_blank"
				class="link github"
			>
				<img src="~/assets/icons/github_white.svg" alt="GitHub 링크" class="icon">
			</a>
			<a
				href="https://www.facebook.com/profile.php?id=100014374502619"
				target="_blank"
				class="link facebook"
			>
				<img src="~/assets/icons/facebook_white.svg" alt="페이스북 링크" class="icon">
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Profiles extends Vue {}
</script>

<style lang="scss" scoped>
@import "./BlogProfiles";
</style>
