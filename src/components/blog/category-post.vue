<template>
	<router-link
		:to="{
			name: 'BlogPost',
			params: {
				id: postid
			}
		}"
		class="blog-category-post"
	>
		<app-image
			:alt="post.thumbnail.alt"
			draggable="false"
			objectfit="cover"
			:src="post.thumbnail.value"
		/>
		<app-text type="word" class="title">{{ post.title }}</app-text>
		<app-text type="line-multiple" class="desc">{{ post.desc }}</app-text>
	</router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import { ImageData } from "@/views/blog/editor.vue";
// Components //
import AppImage from "@/components/app/image.vue";
import AppText from "@/components/app/text.vue";

@Component({
	components: {
		AppImage,
		AppText
	}
})
export default class BlogCategoryPost extends Vue {
	@Prop({
		type: String,
		required: true
	}) postid!: string;

	post = {
		thumbnail: {
			id: -1,
			value: "",
			alt: "",
			width: -1,
			height: -1
		},
		title: "",
		desc: ""
	};

	created() {
		firebase.database().ref(`posts/data/${this.postid}`).on("value", (snapshot) => {
			this.post = snapshot.val();
		});
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.blog-category-post {
	display: flex;
	flex-direction: column;
	gap: 8px;

	width: 256px;

	.app-image {
		width: 256px;
		height: 256px;

		border-radius: 8px;
	}
	.title {
		font-size: 20px;
		font-weight: bold;
	}
	.desc {
		color: $text-color-white-desc;
	}
}
</style>
