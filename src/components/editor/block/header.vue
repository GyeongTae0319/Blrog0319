<template>
	<div class="editor-block-header">
	</div>
</template>

<script lang="ts">
import { Vue , Component } from "vue-property-decorator";
// Components //
import AppImage from "@/components/app/image.vue";

@Component({
	components: { AppImage }
})
export default class EditorBlockHeader extends Vue {}
</script>
