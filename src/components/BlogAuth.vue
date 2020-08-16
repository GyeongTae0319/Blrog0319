<template>
	<div v-if="$store.getters.isAuth" class="user">
		<img
			:src="user.photoUrl"
			alt="프로필 사진"
			referrerpolicy="no-referrer"
			class="profiles-image"
			@click.stop="showInfo = !showInfo"
		>
		<div :class="`info ${showInfo ? 'show' : ''}`" @click.stop>
			<img
				:src="user.photoUrl"
				alt="프로필 사진"
				class="photo"
			>
			<span class="name">{{ user.displayName }}</span>
			<span class="email">{{ user.email }}</span>
			<button class="sign-out" @click="signOut()">로그아웃</button>
		</div>
	</div>
	<button
		v-else
		class="sign-in"
		@click="signIn()"
	>로그인</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/app";
import { IAuthUser } from "@/assets/scripts/types";

interface IAuthCredential {
	accessToken: string;
	idToken: string;
	providerId: string;
	signInMethod: string;
}

@Component
export default class BlogAuth extends Vue {
	showInfo: boolean = false;

	beforeCreate() {
		document.addEventListener("click", () => this.showInfo = false);
	}

	signIn() {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((result) => {
				let credential: IAuthCredential = result.credential as any;
				this.$store.state["user"] = {
					token: credential.accessToken,
					info: result.user
				};
			}).catch();
	}
	signOut() {
		firebase.auth().signOut()
			.then((result) => {
				this.$store.commit("resetUser");
				this.showInfo = false;
			}).catch();
	}

	get loggedIn(): boolean {
		return this.$store.state["user"] != null;
	}
	get user(): IAuthUser {
		let user = this.$store.state["user"].info;
		return {
			photoUrl: user.photoURL,
			displayName: user.displayName,
			email: user.email,
			uid: user.uid
		};
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
		display: none;

		position: absolute;
		z-index: 256;
		top: calc(100% + 12px);
		right: 12px;

		padding: 32px;

		border-radius: 16px;

		flex-direction: column;

		background-color: $background-color-lv1;

		box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);

		&.show {
			display: flex;
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
.sign-in,
.sign-out {
	@include button;
}
.sign-in {
	margin-right: 16px;
}
</style>
