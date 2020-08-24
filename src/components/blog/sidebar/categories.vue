<template>
	<div class="blog-sidebar-categories">
		<div class="header">
			<span class="title">📄 카테고리 목록</span>
			<router-link
				v-if="$store.getters.isAdmin"
				:to="{ name: 'AdminCategory' }"
				class="edit"
				@click="addCategory()"
			>
				<i class="material-icons icon">edit</i>
				<span class="tag">목록 편집</span>
			</router-link>
		</div>
		<div class="list">
			<blog-sidebar-category-list-item :item="$store.state.blog.category" />
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import BlogSidebarCategoryListItem from "@/components/blog/sidebar/category-list-item.vue";

@Component({
	components: { BlogSidebarCategoryListItem }
})
export default class BlogSidebarCategories extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.blog-sidebar-categories {
	display: flex;

	flex-direction: column;

	.header {
		display: flex;

		height: 32px;
		margin-bottom: 4px;

		border-bottom: 1px dashed $background-color-lv2;

		justify-content: space-between;

		.edit {
			@include icon-button(24px);

			color: $text-color-white-desc;
		}
	}
}
</style>
