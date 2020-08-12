<template>
	<div class="container">
		<div>
			<Logo />
			<h1 class="title">
				blrog0319
			</h1>
			<div class="links">
				<a
					href="https://nuxtjs.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="button--green"
				>
					Documentation
				</a>
				<a
					href="https://github.com/nuxt/nuxt.js"
					target="_blank"
					rel="noopener noreferrer"
					class="button--grey"
				>
					GitHub
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "~/components/Logo.vue";

@Component({
	components: { Logo }
})
export default class BlogHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
