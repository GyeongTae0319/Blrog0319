<template>
	<div v-if="$store.getters.isAuth" class="app-header-auth user">
		<app-button
			class="user-profile"
			@click.stop="toggleShowInfo"
		>
			<app-image-profile
				:src="$store.state.auth.photo"
				class="profile-image"
			/>
		</app-button>
		<div
			:class="{
				'info': true,
				'show': showInfo
			}"
			@click.stop
		>
			<app-image-profile
				:src="$store.state.auth.photo"
				class="photo"
			/>
			<span class="name">{{ $store.state.auth.name }}</span>
			<span class="email">{{ $store.state.auth.email }}</span>
			<app-button
				class="sign-out"
				:disabled="!showInfo"
				@click="signOut"
			>로그아웃</app-button>
		</div>
	</div>
	<app-button-tag
		v-else
		dir="down"
		class="app-header-auth sign-in"
		@click="signIn"
	>
		<i class="material-icons icon">login</i>
		<template #tag>로그인</template>
	</app-button-tag>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";
// Components //
import AppButton from "@/components/app/button.vue";
import AppButtonTag from "@/components/app/button-tag.vue";
import AppImageProfile from "@/components/app/image-profile.vue";

@Component({
	components: {
		AppButton,
		AppButtonTag,
		AppImageProfile
	}
})
export default class AppHeaderAuth extends Vue {
	showInfo: boolean = false;

	created() {
		document.addEventListener("click", () => this.showInfo = false);
	}

	toggleShowInfo() {
		this.showInfo = !this.showInfo;
	}

	signIn() {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
			if (!firebase.auth().currentUser) {
				firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {}).catch();
			}
		}).catch();
	}
	signOut() {
		firebase.auth().signOut().then(() => {
			if (this.$route.fullPath.startsWith("/admin")) {
				this.$router.push({ name: "BlogHome" });
			}
		}).catch();
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

// User info
.user {
	position: relative;
	margin-right: 12px;

	.user-profile {
		width: 32px;
		height: 32px;

		border-radius: 100%;
		background-color: $background-color-lv2;

		overflow: hidden;

		.profile-image {
			height: 100%;
		}
	}
	// Popup
	.info {
		--gap-top: 0px;

		display: flex;
		opacity: 0;

		position: absolute;
		z-index: 256;
		top: calc(100% + var(--gap-top));
		right: 0;

		padding: 32px;

		border-radius: 16px;

		flex-direction: column;

		background-color: $background-color-lv1;

		box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);

		pointer-events: none;

		transition: opacity 0.15s, top 0.15s;

		&.show {
			--gap-top: 20px;

			opacity: 1;
			pointer-events: inherit;
		}

		// Info
		.photo {
			width: 128px;
			height: 128px;
			margin: {
				bottom: 16px;
				left: auto;
				right: auto;
			};

			border-radius: 100%;

			background-color: $background-color-lv2;
		}
		.name {
			font-size: large;
			text-align: center;
		}
		.email {
			margin-bottom: 32px;

			color: $text-color-white-desc;
			font-size: small;
			text-align: center;
		}
	}
}

// Buttons
.sign-out {
	width: 100%;
	height: 38px;

	border: 1px solid $background-color-lv3;
	border-radius: 8px;

	transition: border-color 0.1s, background-color 0.1s;

	&:hover {
		$hover-color: rgba($background-color-lv2, 0.5);

		border-color: $hover-color;
		background-color: $hover-color;
	}
}
.sign-in {
	margin-right: 12px;
	padding: 4px;

	border-radius: 4px;

	transition: background-color 0.1s;

	&:hover {
		background-color: $background-color-lv2;
	}
}
</style>
