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
					<span class="tag">프로필 사진 바꾸기</span>
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
						:value="$store.state.blog.info.nickname"
						type="text"
						class="input"
					>
				</label>
				<label class="realname">
					<span class="name">실명</span>
					<input
						:value="$store.state.blog.info.realname"
						type="text"
						class="input"
					>
				</label>
				<label class="description">
					<span class="name">자기소개</span>
					<textarea
						v-model="profileDescription"
						class="input"
					></textarea>
				</label>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class AdminHome extends Vue {
	profileImage: string = this.$store.state.blog.profile_image;
	profileDescription: string = this.$store.state.blog.info.description;

	created() {
		this.profileImage = this.$store.state.blog.profile_image;
		this.profileDescription = this.$store.state.blog.info.description;
	}

	onChangeProfileImageImage(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let file = (target.files as FileList)[0];
		if (file) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = (event) => {
				this.profileImage = event.target?.result as string;
			}
		}
		else this.profileImage = this.$store.state.blog.profile_image;
	}

	@Watch("$store.state.blog.info.description", {
		immediate: true
	}) onChangeBlogInfoDescription(value: string) {
		this.profileDescription = value;
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.admin-home {
	padding: 32px;

	> .title {
		display: block;

		margin-bottom: 16px;
		padding-bottom: 4px;

		border-bottom: 2px solid $background-color-lv2;

		font: {
			size: xx-large;
			weight: bold;
		}
	}
}

.profile {
	display: flex;
	gap: 32px;

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

		font-size: large;

		> * {
			display: flex;

			flex-shrink: 0;
			margin-bottom: 16px;

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
</style>
