import React from "react";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./app/screens/WelcomeScreen/Welcome";
import IntroSlider from "./app/startup/IntroSlider";

let customFonts = {
	"Arciform": require("./app/assets/fonts/arciformff/Arciform.otf")
};

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			appIsReady: false,
			showApp: false
		};
	}

	async componentDidMount() {
		try {
			await SplashScreen.preventAutoHideAsync();
		} catch (e) {
			console.warn(e);
		}
		this.prepareResources();
	}

	prepareResources = async () => {
		await downloadAssets();
		this.setState({ appIsReady: true }, async () => {
			await SplashScreen.hideAsync();
		});
	};

	onComplete = () => {
		this.setState({ showApp: true });
	};

	render() {
		const { appIsReady, showApp } = this.state;
		if (!appIsReady) {
			return null;
		}
		return showApp ? (
			<NavigationContainer>
				<Welcome/>
			</NavigationContainer>
		) : (
			<NavigationContainer>
				<IntroSlider onComplete={this.onComplete}/>
			</NavigationContainer>
		);
	}
}

async function performAPICalls() {}
async function downloadAssets() {
	await Font.loadAsync(customFonts);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FF931E",
		alignItems: "center",
		justifyContent: "center"
	}
});
