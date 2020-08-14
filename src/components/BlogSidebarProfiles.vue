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
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogSidebarProfiles extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

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
	color: $text-color-white-desc;
	font-size: 14px;
	line-height: 1.3em;
}
</style>
