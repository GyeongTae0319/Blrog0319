<template>
	<div class="post-block-link">
		<div class="block">
			<a target="_blank" :href="value.value.url">{{ value.value.url }}</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";
import { ImageData } from '@/views/blog/editor.vue';

@Component({
	components: {
		AppImage
	}
})
export default class PostBlockLink extends Vue {
	@Prop({
		type: Object,
		required: true
	}) value!: { [key: string]: any };
	@Prop({
		type: Vue,
		required: true
	}) bus!: Vue;
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.post-block-link {
	padding: 16px 0;

	.block {
		padding: 0 32px;
		color: $theme-color;
	}
}
</style>
