import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import dash_rides from "../assets/images/slider-images/dash-rides.png";
import money_bag from "../assets/images/slider-images/money-bag.png";
import handshake from "../assets/images/slider-images/handshake.png";
import Theme from "../constants/Theme";
import { Button, Text } from "galio-framework";
import Onboarding from "../screens/Onboarding/Onboarding";
import { clearWelcomeStatus } from "../store/AsyncStorage";
import { StackActions } from '@react-navigation/native';

const slides = [
	{
		key: String(1),
		text: "The world's first social, ethical and most affordable ride service.",
		image: dash_rides
	},
	{
		key: String(2),
		title: "super affordable on-demand rides",
		text: "Every penny of your fare goes directly to the driver, allowing us to offer a more ethical and" +
			" affordable alternative to the other ride providers.",
		image: money_bag
	},
	{
		key: String(3),
		title: "a social experience",
		text: "You’ll receive points after every ride which you can exchange for gifts, discounts and free rides." +
			" Connect with friends to share points & earn rewards faster.",
		image: handshake
	},
	{
		key: String(4),
		title: "",
		text: "",
		image: dash_rides
	}
];

const IMG_HEIGHT = 200, IMG_WIDTH = 200;

class IntroSlider extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	_renderItem = ({ item }) => {
		return item.key !== "4" ?
			(
				<View style={styles.slide}>
					<Image style={styles.image} source={item.image} resizeMode={"contain"} height={IMG_HEIGHT}
					       width={IMG_WIDTH}/>
					{item.title !== undefined && <Text style={styles.title}>{item.title}</Text>}
					<Text style={item.key === "1" ? styles.welcomeText : styles.text}>{item.text}</Text>
				</View>
			) : (
				<Onboarding image={dash_rides} height={IMG_HEIGHT} width={IMG_WIDTH} styles={styles} onAuth={this.props.onAuth}/>
			);
	};

	render() {
		const { navigation } = this.props;
		/*StatusBar.setStatusBarHidden(false, "slide");
		StatusBar.setStatusBarTranslucent(true);
		Platform.OS === "android" && StatusBar.setStatusBarBackgroundColor("#FF931E",true)*/
		return (
			<AppIntroSlider
				renderItem={this._renderItem}
				data={slides}
				activeDotStyle={styles.dot}
				showSkipButton={false}
			/>
		);
	}
}

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.WHITE,
		paddingHorizontal: 35
	},
	image: {
		marginBottom: 20
	},
	title: {
		fontFamily: "Lato-Bold",
		fontSize: 30,
		color: Theme.COLOURS.BLACK,
		textAlign: "center",
		marginBottom: 15
	},
	text: {
		fontWeight: "500",
		fontSize: 20,
		color: Theme.COLOURS.BLACK,
		opacity: 0.5,
		textAlign: "center",
		paddingVertical: 30,
	},
	welcomeText: {
		fontWeight: "500",
		fontSize: 20,
		color: Theme.COLOURS.BLACK,
		textAlign: "center",
		paddingVertical: 30,
	},
	authContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 25
	},
	signupBtn: {
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.PRIMARY,
		width: 200,
		height: 60,
		shadowOffset: { width: 0, height: 4, blur: 4},
		shadowColor: Theme.COLOURS.BLACK,
		shadowOpacity: 0.25,
		borderWidth: 0,
		borderRadius: 50
	},
	loginBtn: {
		justifyContent: "center",
		width: 200,
		height: 60,
		borderWidth: 0,
		backgroundColor: Theme.COLOURS.WHITE,
		borderRadius: 50
	},
	authBtnText: {
		fontFamily: "Lato-Regular",
		fontSize: 20,
		textAlign: "center"
	},
	buttonCircle: {
		width: 44,
		height: 44,
		backgroundColor: "rgba(0, 0, 0, .2)",
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center"
	},
	paginationContainer: {
		position: "absolute",
		bottom: 16,
		left: 16,
		right: 16
	},
	paginationDots: {
		height: 16,
		margin: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	dot: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: Theme.COLOURS.BLACK
	},
	buttonContainer: {
		flexDirection: "row",
		marginHorizontal: 24
	},
});

export default IntroSlider;
