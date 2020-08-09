import React from "react";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import { Image, StyleSheet, Text, View } from "react-native";
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
			fontsLoaded: false,
			showApp: false
		};
	}

	componentDidMount() {
		this._loadFontsAsync().then(() => console.log("Fonts loaded!"));
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	onComplete = () => {
		this.setState({ showApp: true });
	};

	render() {
		const { showApp, fontsLoaded } = this.state;
		if (showApp && fontsLoaded) {
			return (
				<NavigationContainer>
					<Welcome/>
				</NavigationContainer>
			);
		} else {
			return (
				<NavigationContainer>
					<IntroSlider onComplete={this.onComplete}/>
				</NavigationContainer>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
