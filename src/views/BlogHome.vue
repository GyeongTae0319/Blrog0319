<template>
	<div id="blogHome">
		<div class="banner">
			<span class="title">Blrog: 블로의 블로그</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({})
export default class BlogHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

#blogHome {
	.banner {
		display: flex;

		width: 100%;
		height: 320px;

		align-items: flex-end;

		background: {
			image:
				url("../assets/images/banner.png"),
				linear-gradient(
					transparent 25%,
					rgba(0, 0, 0, 0.5) 100%
				)
			;
			position: center;
			size: cover;
			blend-mode: overlay;
		}

		.title {
			margin: 32px;

			font: {
				size: xxx-large;
				weight: bold;
			}
		}
	}
}
</style>
