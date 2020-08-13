<template>
	<div class="blog-sidebar-profiles">
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
				<img src="@/assets/icons/github_white.svg" alt="GitHub 링크" class="icon">
			</a>
			<a
				href="https://www.facebook.com/profile.php?id=100014374502619"
				target="_blank"
				class="link facebook"
			>
				<img src="@/assets/icons/facebook_white.svg" alt="페이스북 링크" class="icon">
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({})
export default class BlogSidebarProfiles extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.blog-profiles {
	display: flex;

	flex-direction: column;
}

.profiles-image {
	display: block;

	width: 100%;
	margin-bottom: 16px;
	padding-top: 100%;

	border-radius: 100%;

	background: {
		color: $background-color-lv2;
		image: url("../assets/images/profiles.png");
		position: center;
		size: cover;
	}
}
.name {
	display: flex;

	margin-bottom: 8px;

	flex-direction: column;

	.nick {
		font: {
			size: xx-large;
			weight: bold;
		}

		line-height: 1em;
	}
	.origin {
		color: $text-color-white-disable;
		font: {
			size: large;
			weight: 100;
		}
	}
}
.description {
	margin-bottom: 16px;

	color: $text-color-white-desc;
	font-size: 14px;
	line-height: 1.3em;
}
.links {
	$icon-size: 32px;

	display: flex;

	width: fit-content;
	margin: 0 auto;
	padding: {
		top: 16px;
		left: 16px;
		right: 16px;
	}

	border-top: 2px solid $text-color-white-disable;

	justify-content: center;
	gap: 16px;

	.link {
		display: block;

		width: $icon-size;
		height: $icon-size;

		.icon {
			width: $icon-size;
			height: $icon-size;
			font-size: $icon-size;

			object-fit: contain;
		}
	}
}
</style>
