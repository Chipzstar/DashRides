import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import dash_rides from "../assets/images/slider-images/dash-rides.png";
import money_bag from "../assets/images/slider-images/money-bag.png";
import handshake from "../assets/images/slider-images/handshake.png";
import Theme from "../constants/Theme";
import { Text } from "galio-framework";
import Onboarding from "../screens/Onboarding/Onboarding";

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

export default IntroSlider;
