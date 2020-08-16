import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		user: {
			token: "",
			info: {
				uid: "",
				photoUrl: "",
				displayName: "",
				email: ""
			}
		}
	},
	getters: {
		loggedIn: (state) => {
			return state.user.token != "";
		},
		adminUser: (state) => {
			return state.user.info.uid == "oCTauzu37UfHNkDKx5DAmwGAAzt1";
		}
	},
	mutations: {
		resetUser: (state) => {
			state.user = {
				token: "",
				info: {
					uid: "",
					photoUrl: "",
					displayName: "",
					email: ""
				}
			}
		}
	},
	actions: {},
	modules: {}
});
export default store;
