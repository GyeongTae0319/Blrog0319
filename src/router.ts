import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// Views //
import BlogHome from "@/views/BlogHome.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "BlogHome",
		component: BlogHome
	},
	{
		path: "/about",
		name: "About",
		component: () => import(
			/* webpackChunkName: "about" */
			"@/views/About.vue"
		)
	}
];

const router = new VueRouter(
	{
		mode: "history",
		base: process.env.BASE_URL,
		routes
	}
);

export default router;
