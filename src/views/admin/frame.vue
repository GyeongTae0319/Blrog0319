<template>
	<div v-if="$store.getters.isAdmin" class="admin-frame">
		<admin-sidebar />
		<router-view class="admin-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AdminSidebar from "@/components/admin/sidebar.vue";

@Component({
	components: { AdminSidebar }
})
export default class AdminFrame extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.admin-frame {
	display: flex;

	height: 100%;
	overflow: hidden;

	.admin-sidebar {
		flex-shrink: 0;
		overflow: hidden auto;
	}
	.admin-contents {
		flex-grow: 1;
		padding: 32px;
		overflow: hidden auto;

		&::v-deep > .title {
			display: block;

			margin-bottom: 16px;
			padding-bottom: 4px;

			border-bottom: 2px solid $background-color-lv2;

			font: {
				size: xx-large;
				weight: bold;
			}
		}
	}
}
</style>
