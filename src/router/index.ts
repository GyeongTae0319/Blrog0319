import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// Views //
import BlogFrame from "@/views/blog/frame.vue";
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
					"@/views/blog/home.vue"
				)
			}
		]
	},
	{
		"path": "/admin",
		component: () => import(
			/* webpackChunkName: "admin-frame" */
			"@/views/admin/frame.vue"
		),
		children: [
			{
				path: "",
				name: "AdminBasic",
				component: () => import(
					/* webpackChunkName: "admin-basic" */
					"@/views/admin/basic.vue"
				)
			},
			{
				path: "bloghome",
				name: "AdminBlogHome",
				component: () => import(
					/* webpackChunkName: "admin-blog-home" */
					"@/views/admin/blog-home.vue"
				)
			},
			{
				path: "category",
				name: "AdminCategory",
				component: () => import(
					/* webpackChunkName: "admin-category" */
					"@/views/admin/category.vue"
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
			if (!store.getters["isAdmin"]) {
				if (from.fullPath.startsWith("/admin")) next({ name: "BlogHome" });
				else next({ path: from.fullPath as string });
			} else  next();
		}, from.name == null ? 1000 : 0);
	} else next();
});

export default router;
