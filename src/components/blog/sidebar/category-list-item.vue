<template>
	<div class="blog-sidebar-category-list-item">
		<div class="name">
			<i
				v-if="item.child != undefined && item.child.length > 0"
				:class="{
					'material-icons': true,
					'icon': true,
					'open': showChild
				}"
			>chevron_right</i>
			<i
				v-else
				class="material-icons icon"
			>list</i>
			<router-link
				:to="{ name: 'BlogHome' }"
				class="name"
			>{{ item.name }}</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { StateBlogCategory } from '@/store';
// Components //
import ComponentBlogSidebarCategoryListItem from "@/components/blog/sidebar/category-list-item.vue";

@Component({
	name: "BlogSidebarCategoryListItem",
	components: { ComponentBlogSidebarCategoryListItem } 
})
export default class BlogSidebarCategoryListItem extends Vue {
	@Prop({
		type: Object,
		required: true
	}) item!: StateBlogCategory;
	@Prop({
		type: Array,
		default: () => { return []; }
	}) path!: number[];

	showChild: boolean = false;

	created() {
		this.item.child = this.item.child || [];
		this.item.posts = this.item.posts || [];
		this.showChild = this.item.lock;
	}

	get getPostCount() {
		let childPost = 0;
		if (this.item.child) this.item.child.forEach((value) => {
			if (value.posts) childPost += value.posts.length;
		});
		return (this.item.posts ? this.item.posts.length : 0) + childPost;
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.blog-sidebar-category-list-item {
	.name {
		display: flex;

		.icon {
			transition: transfrom 0.1s;

			&.open {
				transform: rotate(90deg);
			}
		}
	}
}
</style>
