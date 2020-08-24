import { VuexModule, Module, Mutation } from "vuex-module-decorators";

interface BlogOwner {
	profileImage: string;
	nickname: string;
	realname: string;
}
interface BlogCategory {
	name: string;
	lock: boolean;
	posts: string[];
	child: BlogCategory[];
}
interface DatabaseBlogInfo {
	desc: string;
	nickname: string;
	realname: string;
}

@Module({
	name: "blog",
	namespaced: true
})
export default class StoreModuleBlog extends VuexModule {
	mainBannerImage: string = "";
	description: string = "";
	owner: BlogOwner = {
		profileImage: "",
		nickname: "",
		realname: ""
	};
	category: BlogCategory = {
		name: "root",
		lock: true,
		posts: [],
		child: []
	};

	@Mutation
	setInfo(info: DatabaseBlogInfo) {
		this.description = info.desc;
		this.owner.nickname = info.nickname;
		this.owner.realname = info.realname;
	}
	@Mutation
	setCategory(root: BlogCategory) {
		this.category.child = root.child;
		this.category.posts = root.posts;
	}
}
