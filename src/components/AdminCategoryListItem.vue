<template>
	<div :class="{
		'admin-category-list-item': true,
		'root': !(path && path.length > 0),
		'lock': item.lock || false
	}">
		<div class="title" @click="toggleShowChild">
			<button class="extend">
				<i class="material-icons icon">
					{{ showChild ? "indeterminate_check_box" : "add_box" }}
				</i>
			</button>
			<div
				type="text"
				class="name"
				@click.stop.prevent
				:contenteditable="!item.lock"
			>{{ item.name }}</div>
			<span class="post-count">{{ getPostCount }}</span>
		</div>
		<div v-if="hasChild" v-show="showChild" class="child">
			<admin-category-list-item
				v-for="(child, index) in item.child"
				:key="`${index} ${child}`"
				:item="child"
				:path="path.concat([index])"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import This from "./AdminCategoryListItem.vue";
import { ICategory } from '@/store';

@Component({
	components: { AdminCategoryListItem: This } 
})
export default class AdminCategoryListItem extends Vue {
	@Prop({
		type: Object,
		required: true
	}) item!: ICategory;
	@Prop({
		type: Array,
		default: () => { return []; }
	}) path!: number[];

	showChild = false;

	created() {
		this.showChild = this.item.lock || false;
	}

	toggleShowChild() {
		if (this.item.lock) return;
		this.showChild = !this.showChild
	}

	get getPostCount() {
		let childPost = 0;
		if (this.item.child) this.item.child.forEach((value) => {
			if (value.posts) childPost += value.posts.length;
		});
		return (this.item.posts ? this.item.posts.length : 0) + childPost;
	}
	get hasChild() {
		return this.item.child && this.item.child.length > 0;
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.admin-category-list-item {
	display: flex;
	flex-direction: column;

	&:not(.root) .title::before {
		content: "";

		display: block;
		position: absolute;
		bottom: 12px;
		left: -20px;

		width: 20px;
		height: 20px;

		border: 2px dotted $text-color-white-disable;
		border-width: 0 0 2px 2px;

		box-sizing: border-box;
	}
	&:not(:first-child):not(.root) .title::before {
		height: 30px;
	}

	&:not(.root):not(:last-child) .child::before {
		content: "";

		display: block;
		position: absolute;
		bottom: 20px;
		left: -52px;

		height: calc(100% - 2px);

		border-left: 2px dotted $text-color-white-disable;
	}

	&.lock {
		cursor: not-allowed;

		.extend {
			color: $text-color-white-disable;
		}
	}
	&:not(.lock) {
		cursor: pointer;

		.extend {
			color: $text-color-white;
		}
		.name {
			cursor: text;
		}
	}

	.title {
		display: flex;
		position: relative;

		margin-bottom: 8px;

		&:hover {
			background-color: $background-color-lv2;
		}

		.extend {
			@include icon-button(24px);

			position: relative;

			margin-right: 16px;

			&::after {
				content: "";

				display: block;

				position: absolute;
				left: 24px;

				width: 8px;

				border-top: 2px dotted $text-color-white-disable;
			}
		}
		.name {
			display: block;

			min-width: 32px;
			margin-right: 16px;

			overflow: hidden;

			white-space: nowrap;
		}
		.post-count {
			color: $text-color-white-desc;

			&::before {
				content: "총 포스트 ";
			}
			&::after {
				content: "개";
			}
		}
	}
	.child {
		position: relative;

		margin-left: 32px;
	}
}
</style>
