import React from "react";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./app/screens/OnboardingScreen/Onboarding";
import IntroSlider from "./app/startup/IntroSlider";
import Theme from './app/constants/themes';

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
		this.prepareResources().then(() => console.log("All resources have been loaded!"));
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
				<StatusBar translucent backgroundColor="transparent" />
				<Onboarding/>
			</NavigationContainer>
		) : (
			<NavigationContainer>
				<StatusBar translucent backgroundColor="transparent" />
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
