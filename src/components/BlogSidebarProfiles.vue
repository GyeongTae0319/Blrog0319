<template>
	<div
		:class="{
			'blog-sidebar-profiles': true,
			'editable:': $store.getters.adminUser
		}"
	>
		<span class="profiles-image"></span>
		<div class="name">
			<span class="nick">{{ info.nickname }}</span>
			<span class="real">{{ info.realname }}</span>
		</div>
		<p class="description">{{ info.description }}</p>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/app";

interface IBlogInfo {
	description: string;
	nickname: string;
	realname: string;
}

@Component
export default class BlogSidebarProfiles extends Vue {
	info: IBlogInfo = {
		description: "...",
		nickname: "불러오는 중...",
		realname: "..."
	};

	beforeCreate() {
		firebase.database().ref("info").on("value", (snapshot) => {
			this.info = {
				description: snapshot.child("description").val() as string,
				nickname: snapshot.child("nickname").val() as string,
				realname: snapshot.child("realname").val() as string
			};
		});
	}
}
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
		image: url("https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=a5e3e575-cf6f-4c07-abe1-b42c177d0614");
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
	.real {
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
