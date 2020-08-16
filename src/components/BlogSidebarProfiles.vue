<template>
	<div class="blog-sidebar-profiles">
		<blog-image
			src="https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=a5e3e575-cf6f-4c07-abe1-b42c177d0614"
			alt="프로필 사진"
			class="profile-image"
		/>
		<span class="profiles-image">
			<router-link
				v-if="$store.getters.isAdmin"
				:to="{ name: 'BlogAdmin' }"
				class="edit-profiles"
			>
				<i class="material-icons icon">edit</i>
			</router-link>
		</span>
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
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogSidebarProfiles extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

$sidebar-profile-padding: 32px;

$profile-image-size: $sidebar-width - $sidebar-profile-padding * 2;

.blog-profiles {
	display: flex;

	flex-direction: column;
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
</style>
