<template>
	<div class="category">
		<div class="title">
			<app-text type="word" class="name">{{ category.name }}</app-text>
			<span class="post-count">{{ getPostCount }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { StateBlogCategory } from '@/store';
// Components //
import AppText from "@/components/app/text.vue";

@Component({
	components: { AppText }
})
export default class BlogCategory extends Vue {
	category: StateBlogCategory = {
		name: "",
		lock: false,
		posts: [],
		child: []
	};

	created() {
		this.getCategoryFromParams();
	}

	getCategoryFromParams() {
		// Check load category
		if (!this.$store.state.blog.loadCategory) return;

		// Check not null, param type
		let params = this.$route.params.index;
		if (params == undefined || params.length < 1) {
			this.category = this.$store.state.blog.category;
			return;
		}
		if (Array.isArray(params)) {
			params = params.join("/");
		}

		// Get category
		this.category = eval(`this.$store.state.blog.category.child[${
			params.split("/").join("].child[")
		}]`) || {
			name: "",
			lock: false,
			posts: [],
			child: []
		};
	}

	get getPostCount() {
		let childPost = 0;
		if (this.category.child) this.category.child.forEach((value) => {
			if (value.posts) childPost += value.posts.length;
		});
		return (this.category.posts ? this.category.posts.length : 0) + childPost;
	}

	@Watch("$store.state.blog.category", {
		deep: true,
		immediate: true
	}) onCategoryChanged() {
		this.getCategoryFromParams();
	}
	@Watch("$route.params", {
		deep: true,
		immediate: true
	}) onRouteChanged() {
		this.getCategoryFromParams();
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.category {
	padding: 32px;

	.title {
		display: flex;
		align-items: flex-end;

		width: 100%;
		padding-bottom: 4px;

		border-bottom: 2px solid $background-color-lv2;

		.name {
			font-size: xx-large;
			font-weight: bold;
		}
		.post-count {
			margin-left: 16px;

			color: $text-color-white-desc;
			font-size: large;

			&::before {
				content: "포스트 ";
			}
			&::after {
				content: "개";
			}
		}
	}
}
</style>
