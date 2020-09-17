<template>
	<div class="editor-block"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditorBlock extends Vue {
	@Prop({
		type: Object,
		required: true,
		default: () => {}
	}) value!: { [key: string]: any };

	focused: boolean = false;

	onFocus() {
		
	}
}
</script>

<style lang="scss" scoped>

</style>
