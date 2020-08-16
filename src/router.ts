import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// Views //
import BlogFrame from "@/views/BlogFrame.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: BlogFrame,
		children: [
			{
				path: "",
				name: "BlogHome",
				component: () => import(
					/* webpackChunkName: "blog-admin" */
					"@/views/BlogHome.vue"
				)
			}
		]
	},
	{
		"path": "/admin",
		name: "BlogAdmin",
		component: () => import(
			/* webpackChunkName: "blog-admin" */
			"@/views/BlogAdmin.vue"
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
