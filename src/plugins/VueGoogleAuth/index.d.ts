import firebase from "firebase";

declare class VueGoogleAuth {
	private provider: firebase.auth.AuthProvider;

	constructor () {
		this.provider = firebase.auth.GoogleAuthProvider;
	}

	signInWithPopup() {
		let value: firebase.auth.UserCredential | any;
		await firebase.auth().signInWithPopup(this.provider)
			.then((result) => {
				value = result;
			}).catch((error) => {
				value = error;
			});
		return value;
	}
}
