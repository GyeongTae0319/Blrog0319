import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

// Auth //
interface StateAuth {
	token: string;
	uid: string;
	name: string;
	email: string;
	photo: string;
}
// Blog //
interface BlogOwner {
	profileImage: string;
	nickname: string;
	realname: string;
}
export interface StateBlogCategory {
	name: string;
	lock: boolean;
	posts: string[];
	child: StateBlogCategory[];
}
interface StateBlog {
	mainIconImage: string;
	mainBannerImage: string;
	description: string;
	owner: BlogOwner;
	category: StateBlogCategory;
}
interface DatabaseBlogInfo {
	description: string;
	nickname: string;
	realname: string;
}

// Store state //
interface StoreState {
	auth: StateAuth;
	blog: StateBlog;
}

const store: StoreOptions<StoreState> = {
	state: {
		auth: {
			token: "",
			uid: "",
			name: "",
			email: "",
			photo: ""
		},
		blog: {
			mainIconImage: "",
			mainBannerImage: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fmain_banner.png?alt=media&token=feff9741-ae11-4228-a7d8-6f80792abb09",
			description: "",
			owner: {
				profileImage: "https://firebasestorage.googleapis.com/v0/b/blrog0319.appspot.com/o/images%2Fprofile.png?alt=media&token=fc117556-e1f0-4a82-8098-fa5d8f60ba15",
				nickname: "",
				realname: ""
			},
			category: {
				name: "전체 글 보기",
				lock: true,
				posts: [],
				child: []
			}
		}
	},
	getters: {
		isAuth: (state) => {
			return state.auth.token != "";
		},
		isAdmin: (state) => {
			return state.auth.uid === "oCTauzu37UfHNkDKx5DAmwGAAzt1";
		},
		getAuthUser: (state) => {
			return {
				photo: state.auth.photo,
				name: state.auth.name,
				email: state.auth.email
			}
		}
	},
	mutations: {
		setAuth(state, user: firebase.User) {
			if (user) {
				user.getIdToken().then((token) => {
					state.auth.token = token || "";
				}).catch();
				state.auth.uid = user.uid || "";
				state.auth.name = user.displayName || "";
				state.auth.email = user.email || "";
				state.auth.photo = user.photoURL || "";
			} else {
				state.auth.token =
					state.auth.uid =
					state.auth.name =
					state.auth.email =
					state.auth.photo = "";
			}
		},
		setInfo(state, info: DatabaseBlogInfo) {
			state.blog.description = info.description || "";
			state.blog.owner.nickname = info.nickname || "";
			state.blog.owner.realname = info.realname || "";
		},
		setCategory(state, root: StateBlogCategory) {
			state.blog.category.child = root.child || [];
			state.blog.category.posts = root.posts || [];
		}
	}
};
export default new Vuex.Store(store);
