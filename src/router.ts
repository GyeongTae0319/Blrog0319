import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BlogHome from "@/views/BlogHome.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "BlogHome",
		component: BlogHome
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});
export default router;
