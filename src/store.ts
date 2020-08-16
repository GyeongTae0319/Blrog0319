import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		blog: {
			info: {
				title: "",
				nickname: "",
				realname: "",
				description: ""
			}
		},
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
		isAuth: (state) => {
			return state.user.token != "";
		},
		isAdmin: (state) => {
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

// Export vuex store
export default store;
