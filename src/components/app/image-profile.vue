<template>
	<app-image
		:src="src"
		alt="프로필 사진"
		objectfit="cover"
		draggable="false"
		referrerpolicy="no-referrer"
		class="app-image-profile"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";

@Component({
	components: { AppImage }
})
export default class AppImageProfile extends Vue {
	@Prop({
		type: String,
		required: true
	}) src!: string;
}
</script>
