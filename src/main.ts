import Vue from "vue";
import App from "./app.vue";
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

// Auth check
firebase.auth().onAuthStateChanged((user) => {
	store.commit("setAuth", user);
});

// Informations
firebase.database().ref("info").on("value", (snapshot) => {
	store.commit("setInfo", snapshot.val());
});
// Categories
firebase.database().ref("category/root").on("value", (snapshot) => {
	store.commit("setCategory", snapshot.val());
	store.state.blog.loadCategory = true;
});

// Vue init //
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
