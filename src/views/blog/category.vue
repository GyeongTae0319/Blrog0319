<template>
	<!-- Not exist category -->
	<div v-if="isNone" class="blog-category">
		<div class="title">
			<span class="name">존재하지 않는 카테고리입니다 :(</span>
		</div>
		<router-link :to="{ name: 'BlogCategory' }" class="no-post">
			전체 글 보러가기
		</router-link>
	</div>
	<!-- Show category -->
	<div v-else class="blog-category">
		<div class="title">
			<app-text type="word" class="name">{{ category.name }}</app-text>
			<template>
				<span v-if="getChildPostCount > -1" class="post-count">{{ getChildPostCount }}</span>
				<app-content-placeholder v-else type="word" />
			</template>
		</div>
		<div v-if="hasChild" class="child">
			<blog-category-list-item
				v-for="child in category.child"
				:key="child"
				:category="$store.state.blog.category[child]"
			/>
		</div>
		<template role="Show post list">
			<!-- List -->
			<div v-if="getPostCount > 0" class="post-list">
				<div class="horizontal-list"></div>
				<div class="vertical-list"></div>
			</div>
			<!-- Loadding -->
			<div v-else-if="$store.getters.loadedCategory" class="post-none">
				<svg
					viewBox="0 0 820.16 780.81"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					class="image"
				>
					<defs><linearGradient id="a" x1="539.63" x2="539.63" y1="734.6" y2="151.19" gradientTransform="translate(-3.62 1.57)" gradientUnits="userSpaceOnUse"><stop stop-color="gray" stop-opacity=".25" offset="0"/><stop stop-color="gray" stop-opacity=".12" offset=".54"/><stop stop-color="gray" stop-opacity=".1" offset="1"/></linearGradient><linearGradient id="f" x1="540.17" x2="540.17" y1="180.2" y2="130.75" gradientTransform="translate(-63.92 7.85)" xlink:href="#a"/><linearGradient id="b" x1="540.17" x2="540.17" y1="140.86" y2="82.43" gradientTransform="translate(-84.51 124.6) rotate(-12.11)" xlink:href="#a"/><linearGradient id="e" x1="476.4" x2="476.4" y1="710.53" y2="127.12" xlink:href="#a"/><linearGradient id="c" x1="476.94" x2="476.94" y1="156.13" y2="106.68" xlink:href="#a"/><linearGradient id="d" x1="666.86" x2="666.86" y1="176.39" y2="117.95" xlink:href="#a"/></defs><rect transform="translate(-271.22 62.72) rotate(-12.11)" x="317.5" y="142.55" width="437.02" height="603.82" fill="#e0e0e0"/><g opacity=".5"><rect transform="translate(-271.22 62.72) rotate(-12.11)" x="324.89" y="152.76" width="422.25" height="583.41" fill="url(#a)"/></g><rect transform="translate(-270.79 62.58) rotate(-12.11)" x="329.81" y="157.1" width="411.5" height="570.52" fill="#fafafa"/><rect transform="translate(-213.58 43.93) rotate(-12.11)" x="374.18" y="138.6" width="204.14" height="49.45" fill="url(#f)"/><path transform="translate(-189.92 -59.59)" d="m460.93 91.9c-15.41 3.31-25.16 18.78-21.77 34.55s18.62 25.89 34 22.58 25.16-18.78 21.77-34.55-18.59-25.89-34-22.58zm9.67 45.1a16.86 16.86 0 1 1 12.56-20 16.66 16.66 0 0 1-12.56 20z" fill="url(#b)"/><rect transform="translate(-212.94 43.72) rotate(-12.11)" x="375.66" y="136.55" width="199.84" height="47.27" fill="#0092e7"/><path transform="translate(-189.92 -59.59)" d="m460.93 91.9a27.93 27.93 0 1 0 33.17 21.45 27.93 27.93 0 0 0-33.17-21.45zm9.24 43.1a16.12 16.12 0 1 1 12.38-19.14 16.12 16.12 0 0 1-12.38 19.14z" fill="#0092e7"/><rect x="257.89" y="116.91" width="437.02" height="603.82" fill="#e0e0e0"/><g opacity=".5"><rect x="265.28" y="127.12" width="422.25" height="583.41" fill="url(#e)"/></g><rect x="270.65" y="131.42" width="411.5" height="570.52" fill="#fff"/><rect x="374.87" y="106.68" width="204.14" height="49.45" fill="url(#c)"/><path transform="translate(-189.92 -59.59)" d="M666.86,118c-15.76,0-28.54,13.08-28.54,29.22s12.78,29.22,28.54,29.22,28.54-13.08,28.54-29.22S682.62,118,666.86,118Zm0,46.08a16.86,16.86,0,1,1,16.46-16.86A16.66,16.66,0,0,1,666.86,164Z" fill="url(#d)"/><rect x="377.02" y="104.56" width="199.84" height="47.27" fill="#0092e7"/><path transform="translate(-189.92 -59.59)" d="M666.86,118a27.93,27.93,0,1,0,27.93,27.93A27.93,27.93,0,0,0,666.86,118Zm0,44.05A16.12,16.12,0,1,1,683,145.89,16.12,16.12,0,0,1,666.86,162Z" fill="#0092e7"/><g fill="#47e6b1" opacity=".5"><rect x="15.27" y="737.05" width="3.76" height="21.33"/><rect transform="translate(824.47 540.65) rotate(90)" x="205.19" y="796.65" width="3.76" height="21.33"/></g><g fill="#47e6b1" opacity=".5"><rect x="451.49" width="3.76" height="21.33"/><rect transform="translate(523.63 -632.62) rotate(90)" x="641.4" y="59.59" width="3.76" height="21.33"/></g><path transform="translate(-189.92 -59.59)" d="M961,832.15a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,961,832.15Z" fill="#4d8af0" opacity=".5"/><path transform="translate(-189.92 -59.59)" d="m326.59 627.09a4.61 4.61 0 0 1-2.57-5.57 2.22 2.22 0 0 0 0.1-0.51 2.31 2.31 0 0 0-4.15-1.53 2.22 2.22 0 0 0-0.26 0.45 4.61 4.61 0 0 1-5.57 2.57 2.22 2.22 0 0 0-0.51-0.1 2.31 2.31 0 0 0-1.53 4.15 2.22 2.22 0 0 0 0.45 0.26 4.61 4.61 0 0 1 2.57 5.57 2.22 2.22 0 0 0-0.1 0.51 2.31 2.31 0 0 0 4.15 1.53 2.22 2.22 0 0 0 0.26-0.45 4.61 4.61 0 0 1 5.57-2.57 2.22 2.22 0 0 0 0.51 0.1 2.31 2.31 0 0 0 1.53-4.15 2.22 2.22 0 0 0-0.45-0.26z" fill="#fdd835" opacity=".5"/><path transform="translate(-189.92 -59.59)" d="M855,127.77a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,855,127.77Z" fill="#fdd835" opacity=".5"/><circle cx="812.64" cy="314.47" r="7.53" fill="#f55f44" opacity=".5"/><circle cx="230.73" cy="746.65" r="7.53" fill="#f55f44" opacity=".5"/><circle cx="735.31" cy="477.23" r="7.53" fill="#f55f44" opacity=".5"/><circle cx="87.14" cy="96.35" r="7.53" fill="#4d8af0" opacity=".5"/><circle cx="7.53" cy="301.76" r="7.53" fill="#47e6b1" opacity=".5"/>
				</svg>
				<span class="message">포스트가 존재하지 않습니다 :(</span>
			</div>
			<!-- No post -->
			<div v-else class="post-loading">
				<app-content-placeholder type="list" class="child" />
				LOADING...
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { StateBlogCategory } from '@/store';
// Components //
import AppText from "@/components/app/text.vue";
import AppImage from "@/components/app/image.vue";
import AppContentPlaceholder from "@/components/app/content-placeholder.vue";
import BlogCategoryListItem from "@/components/blog/category-list-item.vue";

@Component({
	components: {
		AppText,
		AppImage,
		AppContentPlaceholder,
		BlogCategoryListItem
	}
})
export default class BlogCategory extends Vue {
	category: StateBlogCategory = {
		name: "",
		post: [],
		child: [],
		lock: false
	};
	path: string = "root";

	created() {
		this.getCategoryFromParams();
	}

	getCategoryFromParams() {
		// Check load category
		if (!this.$store.getters.loadedCategory) return;
		// Get category
		this.category = this.$store.state.blog.category[this.$route.params.id];
	}

	get isNone() {
		return this.$store.getters.loadedCategory && (this.category == undefined || this.category.name == "");
	}
	get hasChild() {
		return this.category.child && this.category.child.length > 0;
	}
	get getPostCount() {
		if (!this.$store.getters.loadedCategory) return -1;
		if (this.category.post) return this.category.post.length;
		return 0;
	}
	get getChildPostCount() {
		if (!this.$store.getters.loadedCategory) return -1;

		let total = this.getPostCount;
		if (this.category.child) {
			this.category.child.forEach(value => {
				if (this.$store.state.blog.category[value].post) {
					total += Object.keys(this.$store.state.blog.category[value].post).length;
				}
			});
		}
		return total;
	}

	@Watch("$store.getters.loadedCategory", {
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

.blog-category {
	padding: 32px;

	.title {
		display: flex;
		gap: 16px;
		align-items: flex-end;

		width: 100%;
		margin-bottom: 8px;
		padding-bottom: 4px;

		border-bottom: 3px solid $background-color-lv2;

		.name {
			font-size: xx-large;
			font-weight: bold;
		}
		.post-count {
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
	.child {
		padding-bottom: 8px;

		border-bottom: 1px solid $background-color-lv2;
	}

	.post-none {
		display: flex;
		gap: 16px;

		flex-direction: column;
		justify-content: center;

		padding: 32px 0;

		.image {
			height: 256px;
		}
		.message {
			color: $text-color-white-desc;
			font-size: 20px;
			text-align: center;
		}
	}
}
</style>
