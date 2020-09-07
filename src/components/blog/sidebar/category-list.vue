<template>
	<div class="blog-sidebar-category-list">
		<div class="header">
			<span class="title">📄 카테고리 목록</span>
			<app-button-tag
				v-if="$store.getters.isAdmin"
				type="route"
				:to="{ name: 'AdminCategory' }"
				class="edit"
			>
				<i class="material-icons icon">edit</i>
				<template #tag>목록 편집</template>
			</app-button-tag>
		</div>
		<blog-category-list />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppButtonTag from "@/components/app/button-tag.vue";
import BlogCategoryList from "@/components/blog/category-list.vue";

@Component({
	components: { AppButtonTag, BlogCategoryList }
})
export default class BlogSidebarCategoryList extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.blog-sidebar-category-list {
	display: flex;
	flex-direction: column;

	.header {
		display: flex;

		height: 32px;
		margin-bottom: 8px;

		border-bottom: 1px dashed $background-color-lv2;

		justify-content: space-between;

		.edit {
			color: $text-color-white-desc;
		}
	}
}
</style>
