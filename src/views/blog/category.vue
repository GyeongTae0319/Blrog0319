<template>
	<div class="category">
		{{ $route.params }}
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { StateBlogCategory } from '@/store';

@Component
export default class BlogCategory extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
</style>
