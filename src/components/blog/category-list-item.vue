<template>
	<div :class="{
		'blog-category-list-item': true,
		'show-child': showChild
	}">
		<div class="title" @click.stop="toggleShowChild">
			<i
				v-if="hasChild"
				class="material-icons icon"
			>chevron_right</i>
			<i v-else class="material-icons icon">list</i>
			<router-link
				:to="{
					name: 'BlogCategory',
					params: {
						id: path
					}
				}"
				class="name"
				@click.native.stop
			>{{ category.name }}</router-link>
		</div>
		<div
			v-if="hasChild"
			v-show="showChild"
			class="child"
		>
			<blog-category-list-item
				v-for="key in category.child"
				:key="key"
				:category="$store.state.blog.category[key]"
				:path="key"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { StateBlogCategory } from "@/store";
// Components //
import RecursionComponent from "@/components/blog/category-list-item.vue"

@Component({
	name: "BlogCategoryListItem",
	components: { RecursionComponent }
})
export default class BlogCategoryListItem extends Vue {
	@Prop({
		type: Object,
		required: true
	}) category!: StateBlogCategory;
	@Prop({
		type: String,
		default: "root"
	}) path!: string;
	@Prop({
		type: Boolean,
		default: false
	}) open!: boolean;

	showChild: boolean = false;

	created() {
		this.showChild = this.hasChild && this.open;
	}

	toggleShowChild() {
		if (this.hasChild) this.showChild = !this.showChild;
	}

	get hasChild() {
		return this.category.child && this.category.child.length > 0;
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-category-list-item {
	display: flex;
	flex-direction: column;

	> .title {
		display: flex;
		align-items: center;

		height: 32px;

		border-radius: 4px;

		cursor: pointer;

		&:hover {
			background-color: rgba($background-color-lv2, 0.5);
		}

		.icon {
			width: 24px;
			height: 24px;
			margin: 4px;

			transition: transform 0.1s;
		}
		.name {
			display: flex;
			flex-direction: column;
			margin-top: 2px;

			&::after {
				content: "";

				display: block;
				width: 0%;

				border-bottom: 2px solid $text-color-white-desc;

				transition: width 0.2s;
			}
			&:hover::after {
				width: 100%;
			}
		}
	}
	> .child {
		margin-left: 12px;
	}

	&.show-child > .title .icon {
		transform: rotate(90deg);
	}
}
</style>
