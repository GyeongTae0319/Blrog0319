import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import store from "@/store";

class VueFirebase {
	constructor () {

	}

	init() {
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
	}

	registerAuthStateListener() {
		firebase.auth().onAuthStateChanged((user) => {
			store.commit("auth/setAuth", user);
		});
	}
	registerDatabaseListener() {
		// Informations
		firebase.database().ref("info").on("value", (snapshot) => {
			store.commit("blog/setInfo", snapshot);
		});
		// Categories
		firebase.database().ref("category/root").on("value", (snapshot) => {
			store.commit("blog/setCategory", snapshot);
		});
	}
}
