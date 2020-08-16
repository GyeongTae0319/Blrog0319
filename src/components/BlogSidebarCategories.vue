<template>
	<div class="blog-sidebar-categories">
		<div class="header">
			<span class="title">📄 카테고리 목록</span>
			<button
				v-if="$store.getters.adminUser"
				class="add"
				@click="addCategory()"
			>
				<i class="material-icons icon">add</i>
			</button>
		</div>
		<div class="list"></div>
		<blog-category-edit-popup
			v-if="showEditPopup"
			@close="showEditPopup = false"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import BlogCategoryEditPopup from "@/components/BlogCategoryEditPopup.vue";

@Component({
	components: { BlogCategoryEditPopup }
})
export default class BlogSidebarCategories extends Vue {
	showEditPopup = false;

	addCategory() {
		this.showEditPopup = true;
	}
	closePopup() {
		console.log("CLOSE");
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.blog-sidebar-categories {
	display: flex;

	flex-direction: column;

	.header {
		display: flex;

		height: 32px;
		margin-bottom: 4px;

		border-bottom: 1px dashed $background-color-lv2;

		justify-content: space-between;

		.title {
			font-weight: bold;
		}
		.add {
			color: $text-color-white-desc;

			cursor: pointer;
		}
	}
}
</style>
