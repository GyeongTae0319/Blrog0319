import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
// Modules //
import AuthModule from "./modules/auth";
import BlogModule from "./modules/blog";

Vue.use(Vuex);

const store: StoreOptions<{}> = {
	modules: {
		AuthModule, BlogModule
	}
}

export default new Vuex.Store(store);
