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
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_DATABASE_URL,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
	measurementId: process.env.VUE_APP_MEASUREMENT_ID
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
