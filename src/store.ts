import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		blog: {
			info: {
				nickname: "",
				realname: "",
				description: ""
			}
		},
		user: {
			token: "",
			info: {
				displayName: "",
				email: "",
				photoUrl: "",
				uid: ""
			}
		}
	},
	getters: {
		isAuth: (state) => {
			return state.user.token != "";
		},
		isAdmin: (state, getters) => {
			return getters.isAuth != "" && state.user.info.uid == "oCTauzu37UfHNkDKx5DAmwGAAzt1";
		}
	},
	mutations: {},
	actions: {},
	modules: {}
});

// Export vuex store
export default store;
