<template>
	<div class="blog-sidebar-category-list-item">
		<div class="name" @click.stop="showChild = !showChild">
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
				:to="{
					name: 'BlogCategory',
					params: {
						index: path
					}
				}"
				class="name"
				@click.native.stop
			>{{ item.name }}</router-link>
			<span class="post-count">{{ getPostCount }}</span>
		</div>
		<div v-show="showChild" class="child">
			<blog-sidebar-category-list-item
				v-for="(item, index) in item.child"
				:key="index"
				:item="item"
				:path="path.concat([index])"
			/>
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
		margin-bottom: 2px;
		cursor: pointer;

		&:hover {
			background-color: $background-color-lv2;
		}

		.icon {
			margin-right: 8px;
			transition: transform 0.1s;

			&.open {
				transform: rotate(90deg);
			}
		}
		.post-count {
			margin: {
				left: auto;
				right: 8px;
			}
		}
	}
	.child {
		display: flex;
		flex-direction: column;
		gap: 2px;

		padding-left: 16px;
	}
}
</style>
