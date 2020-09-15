<template>
	<div class="blog-write-post">
		<editor-header :bus="bus" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import EditorHeader from "@/components/editor/header.vue";

interface DocBlock {
	type: string;
	value: string;
}

@Component({
	components: { EditorHeader }
})
export default class BlogWritePost extends Vue {
	bus: Vue = new Vue();
	// Document
	document: DocBlock[] = [];

	created() {
		this.bus.$on("action", this.onAction);
	}

	// Actions //
	onAction(action: string) {
		if (action.startsWith("add-")) {
			this.onAdd(action.slice("add-".length));
		} else if (action.startsWith("toggle-")) {
			this.onToggle(action.slice("toggle-".length));
		}
	}
	// Add block
	onAdd(type: string) {
		console.log(`ADD: ${type}`);
	}
	// Toggle text styles
	onToggle(type: string) {
		console.log(`TOGGLE: ${type}`)
	}
	
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.header {
	.toolbar {
		display: flex;
		padding: 0 16px;

		border-bottom: 1px solid $background-color-lv2;

		.button {
			display: flex;
			flex-direction: column;
			gap: 4px;

			width: 48px;
			height: 64px;

			.name {
				font-size: small;
			}

			&:hover {
				color: $theme-color;
			}
		}
	}
}
</style>
