import AsyncStorage from '@react-native-community/async-storage';

export const clearWelcomeStatus = async () => {
	try {
		await AsyncStorage.setItem("SHOW_APP", "true");
		console.log("Welcome status: INACTIVE!");
	} catch (err) {
		console.error(err);
	}
}

export const setRideActiveStatus = async () => {
    try {
    	await AsyncStorage.setItem("RIDE_ACTIVE", "true")
	    console.log("Ride status: ACTIVE");
    } catch (err) {
	    console.error(err)
    }
}
