<template>
	<div id="app">
		<app-header id="blogHeader" />
		<router-view class="blog-contents" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import firebase from "firebase/app";
// Components //
import AppHeader from "@/components/app/header/header.vue";

@Component({
	components: { AppHeader }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./assets/styles/variables";

// Reset default properties
* {
	margin: 0;
	padding: 0;

	border: none;
	outline: none;

	background: none;

	box-sizing: border-box;

	// Text styles
	color: inherit;
	font: {
		style: inherit;
		variant-ligatures: inherit;
		variant-caps: inherit;
		variant-numeric: inherit;
		variant-east-asian: inherit;
		weight: inherit;
		stretch: inherit;
		size: inherit;
		family: inherit;
	}
	text-decoration: none;

	// Touch highlight disable
	-webkit-tap-highlight-color: transparent;
	// Click and touch selection
	-webkit-touch-callout: inherit;
	  -webkit-user-select: inherit;
	   -khtml-user-select: inherit;
	     -moz-user-select: inherit;
	      -ms-user-select: inherit;
	          user-select: inherit;

	// Scrollbar style
	&::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: $background-color-lv3;
		border-radius: 6px;
		background-clip: padding-box;
		border: 4px solid transparent;

		&:hover {
			background-color: $background-color-lv4;
		}
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	::placeholder {
		color: $text-color-white-disable;
	}
}

// Set root element styles
html {
	background-color: $background-color;

	color: $text-color-white;
	font: {
		size: medium;
		family: 'Noto Sans KR', sans-serif;
	}

	// Click and touch selection disable
	-webkit-touch-callout: none;
	  -webkit-user-select: none;
	   -khtml-user-select: none;
	     -moz-user-select: none;
	      -ms-user-select: none;
	          user-select: none;

	// Drag disable
	-webkit-user-drag: none;
	 -khtml-user-drag: none;
	   -moz-user-drag: none;
	     -o-user-drag: none;
}
html,
body,
#app {
	height: 100%;
	overflow: hidden;
}
#app {
	display: flex;

	flex-direction: column;

	> #blogHeader {
		flex-shrink: 0;
	}
	> .blog-contents {
		height: 0;
		flex-grow: 1;
	}
}

// Reset html tags
b {
	font-weight: bold;
}
i {
	font-style: italic;
}
u {
	text-decoration: underline;
}
strike {
	text-decoration: line-through;
}
sup,
sub {
	font-size: 0.75em;
}
code {
	background-color: rgba(#61afef, 0.25);
	color: #61afef;
}
</style>
