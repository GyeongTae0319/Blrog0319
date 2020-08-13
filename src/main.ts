// Vue init //
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
	.use(store)
	.use(router)
	.mount("#app");

// Firebase init //
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";

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

export const provider = new firebase.auth.GoogleAuthProvider();
