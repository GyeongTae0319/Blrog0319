<template>
	<div class="post">
		<post-block
			v-for="block in post.blocks"
			:key="block.id"
			:block="block"
			:bus="bus"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/app";
import { BlockData, ImageData } from './editor.vue';
// Components //
import PostBlock from "@/components/post/block.vue";

@Component({
	components: {
		PostBlock
	}
})
export default class BlogPost extends Vue {
	bus: Vue = new Vue();

	post: {
		blocks: BlockData[];
		images: ImageData[];
	} = {
		blocks: [],
		images: []
	};

	created() {
		firebase.database().ref(`posts/contents/${this.$route.params["id"]}`).once("value", (snapshot) => {
			this.post = snapshot.val();
		});

		this.bus.$on("getimage", (id: number, get: any) => {
			if (id < 0) return get(null);
			let index = this.post.images.findIndex((value) => value.id === id);
			if (index < 0) get(null);
			get(this.post.images[index]);
		});
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.post {
	position: relative;

	&::v-deep .block {
		position: relative;

		max-width: $post-width-max;
		margin: 0 auto;
	}
}
</style>
