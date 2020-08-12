import { NuxtConfig } from "@nuxt/types";

// Generate page title
function pageTitleTemplate(title: string) {
	return title ? `${title} - Blrog: 블로의 블로그` : "Blrog: 블로의 블로그";
}

const config: NuxtConfig = {
	mode: "universal",
	target: "static",
	/*
	 ** Headers of the page
	 ** See https://nuxtjs.org/api/configuration-head
	 */
	head: {
		titleTemplate: pageTitleTemplate,
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: "게임 개발과 웹 개발을 하는 마인크래프트 플레이어, 블로의 개발/게임 블로그입니다 :D"
			},
			// Opengraph //
			{
				vmid: "og:title",
				property: "og:title",
				content: "",
				template: pageTitleTemplate
			},
			{
				vmid: "og:description",
				property: "og:description",
				content: "게임 개발과 웹 개발을 하는 마인크래프트 플레이어, 블로의 개발/게임 블로그입니다 :D"
			},
			{
				vmid: "og:image",
				property: "og:image",
				content: ""
			}
		],
		link: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/icon?family=Material+Icons"
			}
		]
	},
	css: ["~/assets/scss/blog.scss"],
	plugins: [],
	components: false,
	buildModules: ["@nuxt/typescript-build"],
	modules: [],
	build: {},
	generate: {
		routes() {}
	}
};
export default config;
