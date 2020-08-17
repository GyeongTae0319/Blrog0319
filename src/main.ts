import Vue from "vue";
import App from "./BlogApp.vue";
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
	console.log(user);
	if (user) {
		user.getIdToken().then((value) => {
			store.state.user.token = value;
		}).catch();
		store.state.user.info = {
			displayName: user.displayName || "",
			email: user.email || "",
			photoUrl: user.photoURL || "",
			uid: user.uid || ""
		}
	} else {
		store.state.user.token = "";
		store.state.user.info = {
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
import BlogContentPlaceholder from "@/components/global/BlogContentPlaceholder.vue";
import BlogImage from "@/components/global/BlogImage.vue";
import BlogText from "@/components/global/BlogText.vue";
Vue.component(BlogContentPlaceholder.name, BlogContentPlaceholder);
Vue.component(BlogImage.name, BlogImage);
Vue.component(BlogText.name, BlogText);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
