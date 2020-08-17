import { AsyncStorage } from "react-native";

export const clearWelcomeStatus = async () => {
	try {
		await AsyncStorage.setItem("SHOW_APP", "true");
		console.log("Welcome status removed!");
	} catch (err) {
		console.error(err);
	}
}
