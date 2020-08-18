<template>
	<div v-if="$store.getters.isAdmin" class="admin-frame">
		<admin-sidebar />
		<router-view class="admin-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Components //
import AdminSidebar from "@/components/AdminSidebar.vue";

@Component({
	components: { AdminSidebar }
})
export default class AdminFrame extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.admin-frame {
	display: flex;

	height: 100%;
	overflow: hidden;

	.admin-sidebar {
		flex-shrink: 0;
	}
	.admin-contents {
		flex-grow: 1;
	}
}
</style>
