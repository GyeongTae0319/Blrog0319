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
			<app-loading-spinner :show="nowUploading" />
			<button class="save" @click="saveCategories">저장하기</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import firebase from "firebase/app";
import { StateBlogCategory } from '@/store';
// Components //
import AppLoadingSpinner from "@/components/app/loading-spinner.vue";
import AdminCategoryListItem from "@/components/admin/category-list-item.vue";

@Component({
	components: {
		AppLoadingSpinner,
		AdminCategoryListItem
	}
})
export default class AdminCategory extends Vue {
	list: StateBlogCategory | null = Object.assign({}, this.$store.state.blog.category);
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
		this.list = Object.assign({}, this.$store.state.blog.category);
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

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
.save {
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
