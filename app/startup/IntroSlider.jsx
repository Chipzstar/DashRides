import React from "react";
import * as StatusBar from "expo-status-bar";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import image1 from "../assets/images/1/c1.png"
import image2 from "../assets/images/2/1.png";
import image3 from "../assets/images/3/1.png";
//import image4 from '../assets/images/4/1.png'

const slides = [
	{
		key: "one",
		title: "Title 1",
		text: "Description.\nSay something cool",
		image: image1,
		backgroundColor: "#FF931E"
	},
	{
		key: "two",
		title: "Title 2",
		text: "Other cool stuff",
		image: image2,
		backgroundColor: "#FF931E"
	},
	{
		key: "three",
		title: "Rocket guy",
		text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
		image: image3,
		backgroundColor: "#FF931E"
	}
];

export default class IntroSlider extends React.Component {
	constructor() {
		super();
	}

	_renderItem = ({ item }) => {
		return (
			<View style={styles.slide}>
				<Text style={styles.title}>{item.title}</Text>
				<Image style={styles.image} source={item.image}/>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};

	_onDone = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		this.props.onComplete();
	};

	render() {
		/*StatusBar.setStatusBarHidden(false, "slide");
		StatusBar.setStatusBarTranslucent(true);
		Platform.OS === "android" && StatusBar.setStatusBarBackgroundColor("#FF931E",true)*/
		return (
			<AppIntroSlider
				renderItem={this._renderItem}
				data={slides}
				onDone={this._onDone}
				showSkipButton={true}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	slide: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FF931E"
	},
	image: {
		width: 200,
		height: 200
	},
	text: {
		fontSize: 18,
		color: "rgba(255, 255, 255, 0.8)",
		textAlign: "center",
		paddingVertical: 30
	},
	title: {
		fontSize: 25,
		color: "white",
		textAlign: "center",
		marginBottom: 15
	}
});
