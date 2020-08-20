import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Firebase //
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Firebase init //
const firebaseConfig = {
	apiKey: "AIzaSyCz8z9oXKsouIFsm2k3tYDxdc_28Win-F8",
	authDomain: "blrog0319.firebaseapp.com",
	databaseURL: "https://blrog0319.firebaseio.com",
	projectId: "blrog0319",
	storageBucket: "blrog0319.appspot.com",
	messagingSenderId: "474514678521",
	appId: "1:474514678521:web:a417a2434cc05144373828",
	measurementId: "G-98Z9BM25VD"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Auth user check
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		user.getIdToken().then((value) => {
			store.state.auth.token = value;
		}).catch();
		store.state.auth.info = {
			displayName: user.displayName || "",
			email: user.email || "",
			photoUrl: user.photoURL || "",
			uid: user.uid || ""
		}
	} else {
		store.state.auth.token = "";
		store.state.auth.info = {
			displayName: "",
			email: "",
			photoUrl: "",
			uid: ""
		}
	}
});

// Vue init //
Vue.config.productionTip = false;

// Global components
import AppContentPlaceholder from "@/components/global/AppContentPlaceholder.vue";
import AppImage from "@/components/global/AppImage.vue";
import AppText from "@/components/global/AppText.vue";
Vue.component(AppContentPlaceholder.name, AppContentPlaceholder);
Vue.component(AppImage.name, AppImage);
Vue.component(AppText.name, AppText);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
