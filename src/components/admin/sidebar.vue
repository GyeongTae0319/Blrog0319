<template>
	<div class="admin-sidebar">
		<div
			v-for="(section, index) in navList"
			:key="index.split(/\s/).join('_')"
			class="section"
		>
			<span class="title">{{ index }}</span>
			<router-link
				v-for="(item, index) in section"
				:key="`${index}_${item.name.split(/\s/).join('_')}`"
				:to="item.to"
				class="link"
			>
				<i class="material-icons icon">{{ item.icon }}</i>
				{{ item.name }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AdminSidebar extends Vue {
	navList = {
		"기본 설정": [
			{
				to: { name: "AdminBasic" },
				icon: "info",
				name: "블로그 정보 수정",
				desc: "프로필 사진, 별명, 이름, 설명 등"
			},
			{
				to: { name: "AdminBlogHome" },
				icon: "home",
				name: "블로그 홈 수정",
				desc: "블로그 홈 배너 사진, 공개 링크 등"
			}
		],
		"글 관리": [
			{
				to: { name: "AdminCategory" },
				icon: "list",
				name: "카테고리 수정",
				desc: "카테고리 생성, 변경, 정렬 등"
			}
		]
	};
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.admin-sidebar {
	width: $sidebar-width;
	height: 100%;

	background-color: $background-color-lv1;

	.section {
		display: flex;
		gap: 8px;

		margin: {
			top: 16px;
			bottom: 32px;
		}
		padding: 0 16px;

		flex-direction: column;

		.title {
			margin-bottom: 4px;
			padding-bottom: 4px;

			border-bottom: 1px solid $background-color-lv2;

			font-size: large;
		}
		.link {
			display: flex;
			gap: 8px;

			padding: 0 8px;

			color: $text-color-white-desc;

			transition: padding 0.15s, color 0.1s;

			&:hover {
				padding-left: 16px;
			}
			&.router-link-exact-active {
				color: $theme-color;
			}
		}
	}
}
</style>
