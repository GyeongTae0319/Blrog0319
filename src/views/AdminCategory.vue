<template>
	<div class="admin-category">
		<span class="title">카테고리</span>
		<div class="category-editor">
			<admin-category-list-item
				v-if="list"
				:item="list"
			/>
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
</style>
