<template>
	<blog-category-list-item
		v-if="$store.getters.loadedCategory"
		:category="$store.state.blog.category.root"
		:open="true"
		class="blog-category-list"
	/>
	<app-content-placeholder v-else type="list" />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { StateBlogCategory } from "@/store";
// Components //
import BlogCategoryListItem from "@/components/blog/category-list-item.vue";
import AppContentPlaceholder from "@/components/app/content-placeholder.vue";

@Component({
	components: {
		BlogCategoryListItem,
		AppContentPlaceholder
	}
})
export default class BlogCategoryList extends Vue {}
</script>
