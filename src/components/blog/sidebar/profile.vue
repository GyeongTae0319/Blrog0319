<template>
	<div class="blog-sidebar-profile">
		<app-image
			:src="$store.state.blog.owner.profileImage"
			alt="프로필 사진"
			objectfit="cover"
			draggable="false"
			class="profile-image"
		/>
		<div class="name">
			<app-text type="word" class="nick">
				{{ $store.state.blog.owner.nickname }}
			</app-text>
			<app-text type="word" class="real">
				{{ $store.state.blog.owner.realname }}
			</app-text>
		</div>
		<app-text type="line-multiple" class="desc">
			{{ $store.state.blog.description }}
		</app-text>
		<router-link
			v-if="$store.getters.isAdmin"
			:to="{ name: 'AdminBasic' }"
			class="edit-profile"
		>
			<i class="material-icons icon">edit</i>
			<span class="tag">프로필 편집</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";
import AppText from "@/components/app/text.vue";

@Component({
	components: { AppImage, AppText }
})
export default class BlogSidebarProfile extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

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

	.image {
		width: 100%;
		height: 100%;

		border-radius: 100%;
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
	@include icon-button(
		24px, 8px,
		$background-color-lv2, $background-color-lv3,
		4px, $background-color-lv1
	);

	position: absolute;
	top: calc(#{$profile-image-size} - (24px + 8px * 2 + 4px * 2));
	right: 0;
}
</style>
