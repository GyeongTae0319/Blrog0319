<template>
	<div id="blogHome">
		<div class="banner">
			<span class="title">Blrog: 블로의 블로그</span>
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
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

$link-icon-size: 32px;

#blogHome {
	> .banner {
		display: flex;

		width: 100%;
		height: 320px;
		padding: 32px;

		justify-content: space-between;
		align-items: flex-end;

		background: {
			image: url("../assets/images/banner.png"),
				linear-gradient(
					transparent 25%,
					rgba(0, 0, 0, 0.5) 100%
				);
			position: center;
			size: cover;
			blend-mode: overlay;
		}

		.title {
			font: {
				size: xxx-large;
				weight: bold;
			}
		}
		.links {
			display: flex;
			gap: 16px;

			.link {
				width: $link-icon-size;
				height: $link-icon-size;

				.icon {
					width: $link-icon-size;
					height: $link-icon-size;
					font-size: $link-icon-size;

					object-fit: contain;
				}
			}
		}
	}
}
</style>
