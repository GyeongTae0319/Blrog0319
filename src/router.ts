import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// Views //
import BlogFrame from "@/views/BlogFrame.vue";
import store from './store';

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
router.beforeEach((to, from, next) => {
	if (to.fullPath.startsWith("/admin")) {
		if (!store.getters.isAdmin) {
			if (from.fullPath.startsWith("/admin")) next({ name: "BlogHome" });
			else next({ path: from.fullPath as string });
		} else  next();
	} else next();
});

export default router;
