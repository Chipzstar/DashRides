import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import { requestSchema } from '../constants/Schemas';

export const config = {
	apiKey: 'AIzaSyB5wg9Gu6z7LDwvDB9BfV03VycPk-aRFZE',
	authDomain: 'ridesdash-13b8a.firebaseapp.com',
	databaseURL: 'https://ridesdash-13b8a.firebaseio.com',
	projectId: 'ridesdash-13b8a',
	storageBucket: 'ridesdash-13b8a.appspot.com',
	messagingSenderId: '222913989504',
	appId: '1:222913989504:web:f2d974e73c06774d498f65',
	measurementId: 'G-SWF94ECC0M',
};

export const uploadPhotoAsync = async (uri, filepath) => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(uri);
		const file = await res.blob();
		let upload = firebase.storage().ref(filepath).put(file);
		upload.on(
			'state_changed',
			snapshot => {},
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

export const updateUserFcmToken = async (user, fcmToken) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (user) {
				let snapshot = (await firebase.database().ref(`users/${user.uid}/fcmToken`).once('value')).val();
				snapshot !== fcmToken
					? await firebase.database().ref(`users/${user.uid}`).update({
							fcmToken,
					  })
					: fcmToken === 'FCM token has not changed';
				resolve(fcmToken);
			}
		} catch (err) {
			reject(err);
		}
	});
};

export const updateUserCoordinates = async (user, coords) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (user) {
				let dataSnapshot = (await firebase.database().ref(`users/${user.uid}/coordinate`).once('value')).val();
				console.log("DataSnapshot", dataSnapshot);
				if (dataSnapshot[0] === coords.latitude && dataSnapshot[1] === coords.longitude)
					resolve('Coords have not changed');
				else {
					await firebase.database().ref().child('users').child(user.uid).child('coordinate').update({
						0: coords.latitude,
						1: coords.longitude,
					});
					resolve('New coordinates have been set!');
				}
			}
		} catch (err) {
			reject(err);
		}
	});
};

export const createDashRequest = async (
	userId,
	{ dest, source, environment, driver, experience, price, arrivalTime, passengers }
) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (userId) {
				let request = await firebase
					.database()
					.ref()
					.child('requests')
					.push({
						...requestSchema,
						riderKey: userId,
						source,
						dest,
						driverType: {
							gender: driver,
							experience,
						},
						environmentFee: environment,
						price,
						arrivalTime,
						passengers,
					});
				resolve(request);
			}
		} catch (e) {
			reject(e);
		}
	});
};

export const getDriverInfo = async driverId => {
	return new Promise(async (resolve, reject) => {
		try {
			let name = await firebase
				.database()
				.ref()
				.child('drivers')
				.child(driverId)
				.child('firstname')
				.once('value');
			resolve(name.val());
		} catch (err) {
			console.log(err);
			reject(err);
		}
	});
};

export default firebase.initializeApp(config);
