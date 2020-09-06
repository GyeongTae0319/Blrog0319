<template>
	<div class="admin-home">
		<span class="title">블로그 정보</span>
		<div class="profile">
			<div class="profile-image">
				<app-image-profile
					:src="profileImage"
					class="image"
				/>
				<app-button-tag class="change" @click="changeProfileImage">
					<i class="material-icons icon">photo_camera</i>
					<template #tag>사진 바꾸기</template>
				</app-button-tag>
				<input
					hidden
					type="file"
					accept="image/png"
					ref="profileImageInput"
					@change="onChangeProfileImageImage"
				>
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
			<app-loading-spinner :show="nowUploading" />
			<button class="save" @click="saveProfile">저장하기</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";
// Components //
import AppImageProfile from "@/components/app/image-profile.vue";
import AppButtonTag from "@/components/app/button-tag.vue";
import AppLoadingSpinner from "@/components/app/loading-spinner.vue";

@Component({
	components: {
		AppImageProfile,
		AppButtonTag,
		AppLoadingSpinner
	}
})
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
		this.profileImage = this.$store.state.blog.owner.profileImage;
		this.profileInput = {
			nickname: this.$store.state.blog.owner.nickname,
			realname: this.$store.state.blog.owner.realname,
			description: this.$store.state.blog.description,
		};
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

	changeProfileImage() {
		let profileImageInput = this.$refs.profileImageInput as HTMLInputElement;
		profileImageInput.click();
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
		firebase.database().ref("info").set({
			description: this.profileInput.description,
			nickname: this.profileInput.nickname,
			realname: this.profileInput.realname
		}, () => {
			info = true;
			this.nowUploading = !image;

			if (!this.nowUploading) location.reload();
		});
	}

	@Watch("$store.state.blog", {
		deep: true,
		immediate: true
	}) onChangeBlogInfoDescription(value: string) {
		this.profileInput = {
			nickname: this.$store.state.blog.owner.nickname,
			realname: this.$store.state.blog.owner.realname,
			description: this.$store.state.blog.description,
		};
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

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
			position: absolute;
			bottom: 0;
			right: 0;

			width: 48px;
			height: 48px;

			border: 4px solid $background-color;
			border-radius: 100%;

			background-color: $background-color-lv2;

			transition: background-color 0.1s;

			&:hover {
				background-color: $background-color-lv3;
			}
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

.save-group {
	display: flex;
	gap: 16px;

	justify-content: flex-end;
	align-items: center;
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
