import { Constants } from 'react-native-unimodules'
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Alert, ToastAndroid } from "react-native";
import * as Location from 'expo-location';

class UserPermissions {
	getCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		if(Constants.platform.ios) {
			status !== "granted" ? Alert.alert("We need permission to use your camera") : null;
		} else {
			status !== "granted" ? ToastAndroid.show("We need permission to use your camera!", ToastAndroid.SHORT) : null;
		}
	}

	getLocationPermission = async () => {
		const { status } = await Location.requestPermissionsAsync();
		if (Constants.platform.ios) {
			status !== "granted" ? Alert.alert("We need permission to access your device's location") : null;
		} else {
			status !== "granted" ? ToastAndroid.show("We need permission to access your device's location!", ToastAndroid.SHORT) : null;
		}
	}
}

export default new UserPermissions()

