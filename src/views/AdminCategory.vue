<template>
	<div class="admin-category">
		<span class="title">카테고리</span>
		<div class="category-editor">
			<admin-category-list-item
				v-if="list"
				:item="list"
			/>
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
			<button class="save" @click="saveCategories">저장하기</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";
// Components //
import AdminCategoryListItem from "@/components/AdminCategoryListItem.vue";
import { ICategory } from '@/store';

@Component({
	components: { AdminCategoryListItem }
})
export default class AdminCategory extends Vue {
	list: ICategory | null = Object.assign({}, this.$store.state.blog.category);
	nowUploading = false;

	saveCategories() {
		this.nowUploading = true;
		firebase.database().ref("category/root").set(this.list, () => {
			this.nowUploading = false;
		});
	}

	@Watch("$store.state.blog.category", {
		deep: true,
		immediate: true
	}) onChangeCategory() {
		this.list = this.$store.state.blog.category;
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.admin-category {
	overflow: hidden auto;

	.category-editor {
		margin-bottom: 32px;
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
