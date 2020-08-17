<template>
	<div class="blog-sidebar-profile">
		<blog-image
			src="https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=a5e3e575-cf6f-4c07-abe1-b42c177d0614"
			alt="프로필 사진"
			class="profile-image"
		/>
		<div class="name">
			<blog-text type="word" class="nick">
				{{ $store.state.blog.info.nickname }}
			</blog-text>
			<blog-text type="word" class="real">
				{{ $store.state.blog.info.realname }}
			</blog-text>
		</div>
		<blog-text type="line-multiple" class="desc">
			{{ $store.state.blog.info.description }}
		</blog-text>
		<router-link
			v-if="$store.getters.isAdmin"
			:to="{ name: 'BlogAdmin' }"
			class="edit-profile"
		>
			<i class="material-icons icon">edit</i>
			<span class="tag">프로필 수정</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogSidebarProfile extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

$profile-image-size: $sidebar-width - $sidebar-padding * 2;

.blog-sidebar-profile {
	position: relative;
}

.profile-image {
	display: block;

	width: $profile-image-size;
	height: $profile-image-size;
	margin-bottom: 16px;
	border-radius: 100%;

	background-color: $background-color-lv2;
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
	.real {
		color: $text-color-white-disable;
		font: {
			size: large;
			weight: 100;
		}
	}
}
.desc {
	color: $text-color-white-desc;
	font-size: 14px;
}
.edit-profile {
	$icon-size: 44px;
	$border-width: 4px;
	$badge-size: calc(#{$icon-size} + #{$border-width});

	display: flex;

	position: absolute;
	z-index: $z-index-popup;
	top: calc(#{$profile-image-size} - #{$badge-size});
	right: 0;

	width: $badge-size;
	height: $badge-size;

	border: 4px solid $background-color-lv1;
	border-radius: calc(#{$badge-size} / 2);

	background-color: $background-color-lv2;

	justify-content: center;
	align-items: center;

	transition: background-color 0.1s;

	&:hover {
		background-color: $background-color-lv3;

		.tag {
			--gap: 16px;

			opacity: 1;

			pointer-events: inherit;
		}
	}

	.tag {
		--gap: 12px;

		display: flex;
		opacity: 0;

		position: absolute;
		bottom: calc(100% + var(--gap));

		width: max-content;
		padding: 8px 12px;

		border-radius: 8px;

		background-color: $background-color-lv2;

		filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.375));

		justify-content: center;
		align-items: center;

		font-size: small;

		pointer-events: none;

		transition: bottom 0.1s, opacity 0.1s;

		&::before {
			content: "";

			display: inline-block;

			position: absolute;
			z-index: -1;
			bottom: -8px;

			width: 16px;
			height: 16px;

			background-color: $background-color-lv2;

			transform: rotate(45deg);
		}
	}
}
</style>
