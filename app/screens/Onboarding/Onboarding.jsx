import React, { Component } from "react";
import {
	ImageBackground,
	Image,
	StyleSheet,
	StatusBar,
	Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import bg from "../../assets/images/bg.png";
import logo from "../../assets/splash/logo.png";
import Theme from '../../constants/Theme';

const { height, width } = Dimensions.get("screen");

export default class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { navigation } = this.props;
		return (
			<Block flex style={styles.container}>
				<Block flex center>
					<ImageBackground
						source={bg}
						style={{ height, width, zIndex: 1 }}
					/>
				</Block>
				<Block center>
					<Image source={logo} style={styles.logo}/>
				</Block>
				<Block flex space="between" style={styles.padded}>
					<Block flex space="around" style={{ zIndex: 2 }}>
						<Block style={styles.title}>
							<Block>
								<Text color="white" size={60}>
									Get Started!
								</Text>
							</Block>
							<Block style={styles.subTitle}>
								<Text color="white" size={16}>
									Fully coded React Native components.
								</Text>
							</Block>
						</Block>
						<Block center>
							<Button
								style={styles.button}
								color={Theme.COLOURS.SECONDARY}
								onPress={() => navigation.navigate("SignUp")}
								textStyle={{ color: Theme.COLOURS.BLACK }}
							>
								Sign Up
							</Button>
							<Button
								style={styles.button}
								color={Theme.COLOURS.WHITE}
								onPress={() => navigation.navigate("SignIn")}
								textStyle={{ color: Theme.COLOURS.BLACK }}
							>
								Log in
							</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.COLOURS.BLACK
	},
	text: {
		fontSize: 25,
		textAlign: "center",
		fontFamily: "Arciform"
	},
	padded: {
		paddingHorizontal: theme.SIZES.BASE * 2,
		position: "relative",
		bottom: theme.SIZES.BASE,
		zIndex: 2
	},
	button: {
		width: width - theme.SIZES.BASE * 4,
		height: theme.SIZES.BASE * 3,
		shadowRadius: 0,
		shadowOpacity: 0
	},
	logo: {
		width: 200,
		height: 200,
		zIndex: 2,
		marginTop: "-50%"
	},
	title: {
		marginTop: "-5%"
	},
	subTitle: {
		marginTop: 20
	}
});
