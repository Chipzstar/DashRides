import {StyleSheet, Dimensions} from "react-native";
import Theme from "../../constants/Theme";
import React from "react";

export const {width, height} = Dimensions.get("window"); //Max Width of phone screen

export default (styles = StyleSheet.create({
	signUpContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: Theme.COLOURS.SIGN_UP,
		paddingHorizontal: 20,
		paddingTop: 100
	},
	signInContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: Theme.COLOURS.WHITE,
		paddingHorizontal: 20,
		paddingTop: 100
	},
	signInHeader: {
		fontFamily: "Lato-Bold",
		paddingBottom: 30,
	},
	title: {
		fontWeight: "bold",
		fontFamily: "Lato-Regular",
		fontSize: 36
	},
	input: {
		width: width * 0.7,
		height: 44,
		padding: 10,
		color: Theme.COLOURS.BLACK,
		borderWidth: 1,
		borderColor: "black",
		marginTop: 5
	},
	nextBtn: {
		height: 50,
		width: 200,
		borderRadius: 15
	},
	error: {
		width: width * 0.7,
		color: 'crimson',
		fontSize: 16,
		fontWeight: "bold"
	},
	avatar: {
		position: "absolute",
		width: 100,
		height: 100,
		borderRadius: 50
	},
	profileImagePicker: {
		width: 100,
		height: 100,
		backgroundColor: Theme.COLOURS.DISABLED,
		opacity: .8,
		borderRadius: 50,
		marginTop: 30,
		alignItems: "center",
		justifyContent: "center"
	},
	loginBtn: {
		borderRadius: 50,
		height: 60,
		width: 200
	},
	text: {
		fontFamily: "Lato-Regular",
		fontSize: 20,
	},
	link: {
		paddingTop: 40
	}
}));
