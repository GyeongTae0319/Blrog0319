<template>
	<!-- Word -->
	<span
		v-if="type === 'word'"
		class="app-content-placeholder word"
	></span>
	<!-- Single line text -->
	<span
		v-else-if="type === 'line-single'"
		class="app-content-placeholder line-single"
	></span>
	<!-- Multiple line text -->
	<span
		v-else-if="type === 'line-multiple'"
		class="app-content-placeholder line-multiple"
	>
		<span class="line"></span>
		<span class="line"></span>
		<span class="line"></span>
	</span>
	<span
		v-else-if="type === 'list'"
		class="app-content-placeholder list"
	>
		<span class="line"></span>
		<span class="line"></span>
		<span class="line"></span>
	</span>
	<!-- Code box -->
	<span
		v-else-if="type === 'code'"
		class="app-content-placeholder code"
	>
		<span class="line">
			<span class="block">#include</span>
			<span class="block">&lt;stdio.h&gt;</span>
		</span>
		<span class="line">
			<span class="block">int</span>
			<span class="block">main()</span>
			<span class="block">{</span>
		</span>
		<span class="line">
			<span class="block">printf("Hello,</span>
			<span class="block">World!");</span>
		</span>
		<span class="line">
			<span class="block">return</span>
			<span class="block">0;</span>
		</span>
		<span class="line">
			<span class="block">}</span>
		</span>
	</span>
	<span
		v-else
		class="app-content-placeholder block"
	></span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AppContentPlaceholder extends Vue {
	@Prop({
		type: String,
		default: "block"
	}) type!: "block" | "word" | "line-single" | "line-multiple" | "list" | "code";
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

@keyframes slide-background {
	0%,
	30% {
		background-color: $background-color-lv2;
	}
	50% {
		background-color: $background-color-lv3;
	}
	70%,
	100% {
		background-color: $background-color-lv2;
	}
}
@mixin loader {
	display: inline-block;

	animation-name: slide-background;
	animation-duration: 2s;
	animation-iteration-count: infinite;
}

.block {
	@include loader;
}

.word {
	@include loader;

	width: 3em;
	height: 0.5em;
	margin: 0.25em 0;

	border-radius: 0.25em;
}
.line-single {
	@include loader;

	width: 100%;
	height: 0.5em;
	margin: 0.25em 0;

	border-radius: 0.25em;
}
.line-multiple {
	display: flex;
	flex-direction: column;

	@for $i from 1 through 3 {
		.line:nth-child(#{$i}) {
			@include loader;

			width: percentage((random(35) + 65) * 0.01);
			height: 0.5em;
			margin: 0.25em + 0.15em 0;

			border-radius: 0.25em;
		}
	}
}

.list {
	display: flex;
	flex-direction: column;

	@for $i from 1 through 3 {
		.line:nth-child(#{$i}) {
			display: flex;
			margin: 0.25em + 0.15em 0;

			&::before {
				@include loader;
				content: "";

				width: 0.5em;
				height: 0.5em;
				margin-right: 0.5em;

				border-radius: 0.25em;
			}
			&::after {
				@include loader;
				content: "";

				width: 0;
				max-width: percentage((random(35) + 65) * 0.01);
				height: 0.5em;
				flex-grow: 1;

				border-radius: 0.25em;
			}
		}
	}
}
</style>
