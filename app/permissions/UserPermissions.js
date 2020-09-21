import { Constants } from 'react-native-unimodules';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Alert, ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { updateUserFcmToken } from '../config/Fire';

class UserPermissions {
	getCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (Constants.platform.ios) {
			status !== 'granted' ? Alert.alert('We need permission to use your camera') : null;
		} else {
			status !== 'granted'
				? ToastAndroid.show('We need permission to use your camera!', ToastAndroid.SHORT)
				: null;
		}
	};

	getLocationPermission = async () => {
		const { status } = await Location.requestPermissionsAsync();
		if (Constants.platform.ios) {
			status !== 'granted' ? Alert.alert("We need permission to access your device's location") : null;
		} else {
			status !== 'granted'
				? ToastAndroid.show("We need permission to access your device's location!", ToastAndroid.SHORT)
				: null;
		}
	};
	registerPushNotifications = async user => {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			await updateUserFcmToken(user, token);
			return token;
		} else {
			Alert.alert('WARNING', 'Must use physical device for Push Notifications');
		}
		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync(user.uid, {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
	};
}

export default new UserPermissions();
