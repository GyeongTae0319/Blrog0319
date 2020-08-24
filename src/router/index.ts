import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// Views //
import BlogFrame from "@/views/BlogFrame.vue";
import store from '@/store';

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
					/* webpackChunkName: "blog-home" */
					"@/views/BlogHome.vue"
				)
			}
		]
	},
	{
		"path": "/admin",
		component: () => import(
			/* webpackChunkName: "admin-frame" */
			"@/views/AdminFrame.vue"
		),
		children: [
			{
				path: "",
				name: "AdminBasic",
				component: () => import(
					/* webpackChunkName: "admin-basic" */
					"@/views/AdminBasic.vue"
				)
			},
			{
				path: "bloghome",
				name: "AdminBlogHome",
				component: () => import(
					/* webpackChunkName: "admin-blog-home" */
					"@/views/AdminBlogHome.vue"
				)
			},
			{
				path: "category",
				name: "AdminCategory",
				component: () => import(
					/* webpackChunkName: "admin-category" */
					"@/views/AdminCategory.vue"
				)
			}
		]
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
		setTimeout(() => {
			if (!store.getters["auth/isAdmin"]) {
				if (from.fullPath.startsWith("/admin")) next({ name: "BlogHome" });
				else next({ path: from.fullPath as string });
			} else  next();
		}, from.name == null ? 1000 : 0);
	} else next();
});

export default router;
