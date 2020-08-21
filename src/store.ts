import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface IUserInfo {
	displayName: string,
	email: string,
	photoUrl: string,
	uid: string
}
export interface IBlogInfo {
	description: string;
	nickname: string;
	realname: string;
}
export interface ICategory {
	name: string;
	posts?: string[];
	child: ICategory[];
	lock?: boolean;
}

export interface State {
	auth: {
		token: string;
		info: IUserInfo;
	},
	blog: {
		bannerImage: string;
		profileImage: string;
		info: IBlogInfo
		category: ICategory | null;
	}
}

var store = new Vuex.Store({
	state: {
		auth: {
			token: "",
			info: {
				displayName: "",
				email: "",
				photoUrl: "",
				uid: ""
			}
		},
		blog: {
			bannerImage: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fmain_banner.png?alt=media&token=feff9741-ae11-4228-a7d8-6f80792abb09",
			profileImage: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=fc117556-e1f0-4a82-8098-fa5d8f60ba15",
			info: {
				description: "",
				nickname: "",
				realname: ""
			},
			category: null
		}
	},
	getters: {
		isAuth: (state) => {
			return state.auth.token != "";
		},
		isAdmin: (state) => {
			return state.auth.info.uid === "oCTauzu37UfHNkDKx5DAmwGAAzt1";
		}
	},
	mutations: {},
	actions: {},
	modules: {}
});

export default store;
