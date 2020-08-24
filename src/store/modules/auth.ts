import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import firebase from "firebase/app";

@Module({
	name: "auth",
	namespaced: true
})
export default class StoreModuleAuth extends VuexModule {
	token: string = "";
	uid: string = "";
	name: string = "";
	email: string = "";
	photo: string = "";

	@Mutation
	setAuth(user: firebase.User) {
		if (user) {
			user.getIdToken().then((token) => {
				this.token = token;
			}).catch();
			this.uid = user.uid;
			this.name = user.displayName || "";
			this.email = user.email || "";
			this.photo = user.photoURL || "";
		} else {
			this.token = this.uid = this.name = this.email = this.photo = "";
		}
	}

	get isAuth(): boolean {
		return this.token != "";
	}
	get isAdmin(): boolean {
		return this.uid === "oCTauzu37UfHNkDKx5DAmwGAAzt1";
	}
}
