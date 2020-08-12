import { Constants } from 'react-native-unimodules'
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Alert, ToastAndroid } from "react-native";

class UserPermissions {
	getCameraPermission = async () => {
		if(Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			status !== "granted" ? Alert.alert("We need permission to use your camera") : null;
		} else {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			status !== "granted" ? ToastAndroid.show("We need permission to use your camera!", ToastAndroid.SHORT) : null;
		}
	}
}

export default new UserPermissions()

