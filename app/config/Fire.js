import * as firebase from "firebase";
import "firebase/firestore";

export const config = {
	apiKey: "AIzaSyB5wg9Gu6z7LDwvDB9BfV03VycPk-aRFZE",
	authDomain: "ridesdash-13b8a.firebaseapp.com",
	databaseURL: "https://ridesdash-13b8a.firebaseio.com",
	projectId: "ridesdash-13b8a",
	storageBucket: "ridesdash-13b8a.appspot.com",
	messagingSenderId: "222913989504",
	appId: "1:222913989504:web:f2d974e73c06774d498f65",
	measurementId: "G-SWF94ECC0M"
};

export const uploadPhotoAsync = async (uri, filepath) => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(uri);
		const file = await res.blob();
		let upload = firebase
			.storage()
			.ref(filepath)
			.put(file);
		upload.on(
			"state_changed",
			snapshot => {
			},
			err => {
				reject(err);
			},
			async () => {
				const url = await upload.snapshot.ref.getDownloadURL();
				resolve({ downloadURL: url });
			}
		);
	});
};

export default firebase.initializeApp(config);
