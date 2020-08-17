<template>
	<span class="blog-text">
		<span
			v-show="isLoadded"
			ref="text"
		>
			<slot></slot>
		</span>
		<blog-content-placeholder v-if="!isLoadded" :type="type" />
	</span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VNode } from 'vue';

@Component
export default class BlogText extends Vue {
	@Prop({
		type: String,
		default: "line-single"
	}) type!: "word" | "line-single" | "line-multiple";

	isLoadded = false;

	created() {
		var interval = setInterval(() => {
			if ((this.$refs.text as Element).innerHTML.replace(/\s/g, "") != "") {
				this.isLoadded = true;
				clearInterval(interval);
			}
		}, 100);
	}
}
</script>
