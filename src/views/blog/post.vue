<template>
	<div class="category">
		{{ this.$route.params }}
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogPost extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
</style>
