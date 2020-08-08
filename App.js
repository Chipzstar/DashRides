import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./app/screens/WelcomeScreen/Welcome";
import IntroSlider from "./app/startup/IntroSlider";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			showApp: false
		};
	}

	onComplete = () => {
		this.setState({ showApp: true });
	};

	render() {
		const { showApp } = this.state;
		if (showApp) {
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
