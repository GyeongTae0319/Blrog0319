<template>
	<div class="admin-home">
		<span class="title">블로그 정보</span>
		<div class="profile">
			<div class="profile-image">
				<app-image
					:src="profileImage"
					draggable="false"
					objectfit="cover"
					class="image"
				/>
				<label for="profileImageInput" class="change">
					<i class="material-icons icon">photo_camera</i>
					<span class="tag">사진 바꾸기</span>
					<input
						hidden
						type="file"
						accept="image/png"
						id="profileImageInput"
						@change="onChangeProfileImageImage"
					>
				</label>
			</div>
			<div class="info">
				<label class="nickname">
					<span class="name">별명</span>
					<input
						type="text"
						v-model="profileInput.nickname"
						class="input"
					>
				</label>
				<label class="realname">
					<span class="name">실명</span>
					<input
						type="text"
						v-model="profileInput.realname"
						class="input"
					>
				</label>
				<label class="description">
					<span class="name">자기소개</span>
					<textarea
						v-model="profileInput.description"
						class="input"
					></textarea>
				</label>
			</div>
		</div>
		<div class="save-group">
			<svg viewBox="0 0 50 50" :class="{
				progress: true,
				show: nowUploading
			}">
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke-width="5"
					class="circle"
				/>
			</svg>
			<button class="save" @click="saveProfile">저장하기</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";

@Component
export default class AdminHome extends Vue {
	profileImageChanged = false;
	profileImage: string = "";
	profileInput = {
		nickname: "",
		realname: "",
		description: ""
	};
	nowUploading = false;

	created() {
		this.profileImage = this.$store.state.blog.profileImage;
		this.profileInput = Object.assign({}, this.$store.state.blog.info);
	}

	onChangeProfileImageImage(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let file = (target.files as FileList)[0];
		if (file && file.type === "image/png") {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = (event) => {
				this.profileImageChanged = true;
				this.profileImage = event.target?.result as string;
			}
		}
	}

	saveProfile() {
		this.nowUploading = true;
		let image = false, info = false;
		if (this.profileImageChanged) {
			let profileImageRef = firebase.storage().ref().child("images/profile.png");
			profileImageRef.putString(this.profileImage, "data_url").then((snapshot) => {
				image = true;
				this.profileImageChanged = false;
				this.nowUploading = !info;

				if (!this.nowUploading) location.reload();
			});
		} else image = true;
		firebase.database().ref("info").set(this.profileInput, () => {
			info = true;
			this.nowUploading = !image;

			if (!this.nowUploading) location.reload();
		});
	}

	@Watch("$store.state.blog.info", {
		deep: true,
		immediate: true
	}) onChangeBlogInfoDescription(value: string) {
		this.profileInput = this.$store.state.blog.info;
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.profile {
	display: flex;
	gap: 32px;

	margin-bottom: 16px;

	.profile-image {
		display: inline-block;
		position: relative;

		width: 240px;
		height: 240px;
		flex-shrink: 0;
		border-radius: 100%;

		background-color: $background-color-lv2;

		.image {
			width: 100%;
			height: 100%;

			border-radius: 100%;
		}

		.change {
			@include icon-button(
				24px, 8px,
				$background-color-lv2, $background-color-lv3,
				4px, $background-color
			);

			position: absolute;
			bottom: 0;
			right: 0;
		}
	}
	.info {
		display: flex;
		flex: {
			grow: 1;
			direction: column;
		}
		gap: 16px;

		font-size: large;

		> * {
			display: flex;

			flex-shrink: 0;

			.name {
				flex: {
					basis: 128px;
					shrink: 0;
				}
			}
			.input {
				padding-bottom: 4px;
				flex-grow: 1;

				border-bottom: 2px solid rgba($background-color-lv2, 0.5);

				transition: border-color 0.1s;

				&:focus {
					border-color: $background-color-lv3;
				}
			}
		}
		.description {
			flex-grow: 1;

			.input {
				width: 100%;
				height: 100%;
				padding: 8px;
				resize: none;

				border: 2px solid rgba($background-color-lv2, 0.5);

				word-break: break-all;

				&:focus {
					border-color: $background-color-lv3;
				}
			}
		}
	}
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes stretching {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}

.save-group {
	display: flex;
	gap: 16px;

	justify-content: flex-end;
	align-items: center;
}
.progress {
	display: inline-block;

	width: 32px;
	height: 32px;

	overflow: visible;

	animation: rotate 2s linear infinite;

	.circle {
		stroke: transparent;
		stroke-linecap: round;

		animation: stretching 1.5s ease-in-out infinite;
	}
	&.show .circle {
		stroke: $background-color-lv3;
	}
}
.save {
	@include button;

	display: inline-block;

	padding: {
		top: 6px;
		bottom: 8px;
		left: 12px;
		right: 12px;
	}

	border: 1px solid $background-color-lv2;
	border-radius: 4px;

	&:hover {
		background-color: $background-color-lv2;
	}
}
</style>
