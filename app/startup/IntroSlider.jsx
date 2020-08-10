import React from "react";
import * as StatusBar from "expo-status-bar";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import welcomeImg from "../assets/images/slider-images/welcome.png";
import image2 from "../assets/images/2/1.png";
import image3 from "../assets/images/3/1.png";
import { Ionicons } from '@expo/vector-icons';
import Theme from "../constants/themes";

const slides = [
	{
		key: "one",
		title: "Welcome!",
		text: "Dash Rides is the world's first social, ethical and most affordable ridesharing service made for" +
			" students.",
		image: welcomeImg,
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	{
		key: "two",
		title: "Super cheap on-demand rides",
		text: "We have the cheapest rides on the market at all times because every penny of ride fares goes to your" +
			" driver. \rThe first commission-free platform for drivers, making us a more ethical and equitable" +
			" alternative.",
		image: image2,
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	{
		key: "three",
		title: "Connect with friends",
		text: "You receive points after every ride and when you send gifts to friends. \rSee what your friends are" +
			" doing and where they are going.",
		image: image3,
		backgroundColor: Theme.COLOURS.PRIMARY
	}
];

export default class IntroSlider extends React.Component {
	constructor() {
		super();
	}

	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Ionicons
					name="md-arrow-round-forward"
					color="rgba(255, 255, 255, .9)"
					size={24}
				/>
			</View>
		);
	};

	_renderPrevButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Ionicons
					name="md-arrow-round-back"
					color="rgba(255, 255, 255, .9)"
					size={24}
				/>
			</View>
		);
	};

	_renderItem = ({ item }) => {
		return (
			<View style={styles.slide}>
				<Image style={styles.image} source={item.image}/>
				<Text style={item.key === 'one' ? styles.welcomeTitle : styles.title}>{item.title}</Text>
				<Text style={item.key === 'one' ? styles.welcomeText : styles.text}>{item.text}</Text>
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
				renderNextButton={this._renderNextButton}
				renderPrevButton={this._renderPrevButton}
				data={slides}
				onDone={this._onDone}
				showSkipButton={true}
			/>
		);
	}
}

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		alignItems: "center",
		paddingTop: 80,
		justifyContent: "flex-start",
		backgroundColor: Theme.COLOURS.PRIMARY,
		paddingHorizontal: 35
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 20
	},
	title: {
		fontFamily: "Arciform",
		fontSize: 30,
		color: "white",
		textAlign: "left",
		marginBottom: 15
	},
	text: {
		fontSize: 18,
		color: "rgba(255, 255, 255, 0.8)",
		textAlign: "left",
		paddingVertical: 30
	},
	welcomeText: {
		fontSize: 18,
		color: "rgba(255, 255, 255, 0.8)",
		textAlign: "center",
		paddingVertical: 30
	},
	welcomeTitle: {
		fontFamily: "Arciform",
		fontSize: 50,
		color: "white",
		textAlign: "center",
		marginBottom: 15,
		letterSpacing: 2
	},
	buttonCircle: {
		width: 44,
		height: 44,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},

});
