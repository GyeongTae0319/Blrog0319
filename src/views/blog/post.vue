<template>
	<div class="category">
		{{ this.$route.params }}
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/app";
import { BlockData } from './editor.vue';

@Component
export default class BlogPost extends Vue {
	blockList: BlockData[] = [];

	created() {
		firebase.database().ref(`posts/contents/${this.$route.params["id"]}`).on("value", (snapshot) => {
			this.blockList = snapshot.val();
			console.log(this.blockList);
		});
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
</style>
