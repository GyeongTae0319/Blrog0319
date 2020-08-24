<template>
	<div v-if="$store.getters.isAuth" class="app-header-auth user">
		<img
			:src="$store.state.auth.info.photoUrl"
			alt="프로필 사진"
			referrerpolicy="no-referrer"
			class="profiles-image"
			@click.stop="showInfo = !showInfo"
		>
		<div
			:class="{
				'info': true,
				'show': showInfo
			}"
			@click.stop
		>
			<img
				:src="$store.state.auth.info.photoUrl"
				alt="프로필 사진"
				class="photo"
			>
			<span class="name">{{ $store.state.auth.info.displayName }}</span>
			<span class="email">{{ $store.state.auth.info.email }}</span>
			<button class="sign-out" @click="signOut()">로그아웃</button>
		</div>
	</div>
	<button
		v-else
		class="app-header-auth sign-in"
		@click="signIn()"
	>로그인</button>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";

@Component
export default class AppHeaderAuth extends Vue {
	showInfo: boolean = false;

	created() {
		document.addEventListener("click", () => this.showInfo = false);
	}

	signIn() {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(() => {
				if (!firebase.auth().currentUser) {
					firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
						.then(() => {})
						.catch();
				}
			}).catch();
	}
	signOut() {
		firebase.auth().signOut()
			.then(() => {
				if (this.$route.fullPath.startsWith("/admin")) {
					this.$router.push({ name: "BlogHome" });
				}
			}).catch();
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

// User info
.user {
	position: relative;

	height: 100%;
	padding: 8px;

	.profiles-image {
		height: 100%;

		border-radius: 100%;

		background-color: $background-color-lv2;

		cursor: pointer;
	}
	// Popup
	.info {
		--gap-top: 0px;

		display: flex;
		opacity: 0;

		position: absolute;
		z-index: 256;
		top: calc(100% + var(--gap-top));
		right: 12px;

		padding: 32px;

		border-radius: 16px;

		flex-direction: column;

		background-color: $background-color-lv1;

		box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);

		pointer-events: none;

		transition: opacity 0.15s, top 0.15s;

		&.show {
			--gap-top: 12px;

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
	@include button;

	width: 100%;
	height: 38px;
	padding: {
		bottom: 4px;
		left: 12px;
		right: 12px;
	};

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
	@include button;

	width: 64px;
	height: 32px;
	margin: 8px;
	padding-bottom: 4px;

	border-radius: 4px;

	background-color: $background-color-lv2;

	transition: background-color 0.1s;

	&:hover {
		background-color: $background-color-lv3;
	}
}
</style>
