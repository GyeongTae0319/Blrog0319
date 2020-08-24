<template>
	<div
		:class="{
			'admin-category-list-item': true,
			'root': !(path != undefined && path.length > 0),
			'lock': item.lock || false
		}"
	>
		<div class="title">
			<button :class="{
				'extend': true,
				'no-child': !(item.child != undefined && item.child.length > 0)
			}" @click="toggleShowChild">
				<i v-if="item.child != undefined && item.child.length > 0" class="material-icons icon">
					{{ showChild ? "indeterminate_check_box" : "add_box" }}
				</i>
				<i v-else class="material-icons icon">list</i>
			</button>
			<div
				type="text"
				:contenteditable="!item.lock"
				spellcheck="false"
				class="name"
				@click.stop.prevent
				@input="onInputCategoryName"
				@keydown="onKeyDownCategoryName"
			>{{ categoryName }}</div>
			<span class="post-count">{{ getPostCount }}</span>
			<div class="buttons">
				<button class="button add" @click="addNewChild">
					<i class="material-icons icon">add</i>
				</button>
				<button class="button remove" @click="showRemovePopup = true">
					<i class="material-icons icon">close</i>
				</button>
				<button class="button move">
					<i class="material-icons icon">drag_indicator</i>
				</button>
			</div>
		</div>
		<div
			v-if="item.child != undefined && item.child.length > 0"
			v-show="showChild"
			class="child"
		>
			<template
				v-for="(child, index) in item.child"
			>
				<admin-category-list-item
					:key="`${childUpdated}_${index}`"
					:item="child"
					:path="path.concat([index])"
					@remove="removeChild"
				/>
			</template>
		</div>
		<div :class="{
			'popup': true,
			'remove-category': true,
			'show': showRemovePopup
		}">
			<div class="window">
				<div class="header">{{ item.name }} 카테고리 삭제</div>
				<div class="contents">
					<span class="message">정말로 삭제하시겠습니까?</span>
					<span class="desc">해당 카테고리의 글은 상위 카테고리로 이동합니다.</span>
				</div>
				<div class="footer">
					<button class="button y" @click="removeItem">네</button>
					<button class="button n" @click="showRemovePopup = false">아니요</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { StateBlogCategory } from '@/store';
// Components //
import ComponentAdminCategoryListItem from "@/components/admin/category-list-item.vue";

export class CategoryRemoveEvent {
	posts: string[] = [];
	child: StateBlogCategory[] = [];
	index!: number;
}

@Component({
	name: "AdminCategoryListItem",
	components: { ComponentAdminCategoryListItem } 
})
export default class AdminCategoryListItem extends Vue {
	@Prop({
		type: Object,
		required: true
	}) item!: StateBlogCategory;
	@Prop({
		type: Array,
		default: () => { return []; }
	}) path!: number[];

	showChild: boolean = false;
	showRemovePopup: boolean = false;
	categoryName: string = "";
	childUpdated: number = 0;

	created() {
		this.categoryName = "" + this.item.name;
		this.showRemovePopup = false;
		this.item.child = this.item.child || [];
		this.item.posts = this.item.posts || [];
		this.showChild = this.item.lock || false;
	}

	removeItem() {
		this.showRemovePopup = false;
		let event = new CategoryRemoveEvent;
		if (this.item.posts) event.posts = event.posts.concat(this.item.posts);
		if (this.item.child) event.child = event.child.concat(this.item.child);
		event.index = this.path.pop() || 0;
		this.$emit("remove", event);
	}

	// Child visibility
	toggleShowChild() {
		if (!this.item.child.length) return;
		this.showChild = !this.showChild;
	}

	// Input events
	onInputCategoryName(event: InputEvent) {
		let target = event.target as HTMLDivElement;
		this.item.name = target.innerText;
	}
	onKeyDownCategoryName(event: KeyboardEvent) {
		if (event.keyCode === 13) event.preventDefault();
	}

	// Child change
	addNewChild() {
		this.item.child.push({
			name: "새로운 카테고리",
			lock: false,
			posts: [],
			child: []
		});
		this.$forceUpdate();
		this.showChild = true;
	}
	removeChild(event: CategoryRemoveEvent) {
		this.item.posts = this.item.posts.concat(event.posts);
		this.item.child.splice(event.index, 1);
		this.item.child = this.item.child.concat(event.child);
		this.childUpdated++;
		this.$forceUpdate();
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
@import "../../assets/styles/variables";

.admin-category-list-item {
	display: flex;
	flex-direction: column;

	.title {
		display: flex;
		position: relative;

		width: 100%;
		height: 32px;

		align-items: center;

		.extend {
			display: flex;
			align-items: center;

			position: relative;
			margin-right: 18px;

			flex-shrink: 0;

			cursor: pointer;

			&::after {
				content: "";

				display: block;
				position: absolute;
				right: -10px;

				width: 10px;
				border-top: 2px dotted $text-color-white-disable;

				pointer-events: none;
			}
			&.no-child {
				cursor: default;
			}
		}
		.name {
			flex-grow: 1;
			width: 0;
			height: 26px;
			margin-right: 16px;

			white-space: nowrap;
			overflow: hidden;

			&[contenteditable=true] {
				border-bottom: 2px solid rgba($background-color-lv2, 0.5);
				transition: border-color 0.1s;

				&:focus {
					border-color: $background-color-lv3;
				}
			}
		}
		.post-count {
			flex-shrink: 0;
			margin-right: 16px;

			color: $text-color-white-desc;

			&::before {
				content: "총 포스트 ";
			}
			&::after {
				content: "개";
			}
		}
		.buttons {
			display: flex;
			align-items: center;
			gap: 8px;

			flex-shrink: 0;

			.button {
				height: 24px;

				cursor: pointer;
			}
			.add {
				color: rgb(170, 226, 65);
			}
			.remove {
				color: rgb(226, 64, 59);
			}
			.move {
				cursor: move;
			}
		}
	}
	&:not(.root) {
		.title::before {
			content: "";

			display: block;

			position: absolute;
			bottom: 15px;
			left: -20px;

			height: 20px;
			width: 20px;

			border: {
				bottom: 2px dotted $text-color-white-disable;
				left: 2px dotted $text-color-white-disable;
			}

			box-sizing: border-box;

			pointer-events: none;
		}
		&:not(:first-child) .title::before {
			height: 30px;
		}
	}
	&.lock > .title {
		.buttons {
			.remove,
			.move {
				color: $text-color-white-disable;
				cursor: not-allowed;
			}
		}
	}

	.child {
		position: relative;
		margin-left: 32px;
	}
	&:not(:last-child) > .child::before {
		content: "";

		display: block;

		position: absolute;
		bottom: 15px;
		left: -52px;

		height: calc(100% - 2px);

		border-left: 2px dotted $text-color-white-disable;

		pointer-events: none;
	}
}

.popup {
	@include popup;

	opacity: 0;
	pointer-events: none;

	transition: opacity 0.15s;

	.window {
		transform: translateY(-12px);

		transition: transform 0.15s;

		.footer  .button {
			cursor: pointer;
		}
	}

	&.show {
		opacity: 1;
		pointer-events: all;

		.window {
			transform:  translateY(0px);
		}
	}
}
</style>
