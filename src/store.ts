import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		blog: {
			banner_image: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fmain_banner.png?alt=media&token=feff9741-ae11-4228-a7d8-6f80792abb09",
			profile_image: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=a5e3e575-cf6f-4c07-abe1-b42c177d0614",
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
