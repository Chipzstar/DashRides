import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../constants/Theme";

export const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
export const { height: HEIGHT } = Dimensions.get("window"); //Max Height of phone screen

export const searchInputStyle = {
	container: {
		backgroundColor: "transparent",
		flex: 1,
		width: WIDTH,
		marginBottom: 0,
		opacity: 0.9,
		borderRadius: 8,
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 4
	},
	listView: {
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 2
	},
	description: {
		fontWeight: "bold",
		color: "#007",
		borderTopWidth: 0,
		borderBottomWidth: 0,
		opacity: 0.9
	},
	predefinedPlacesDescription: {
		color: Theme.COLOURS.SECONDARY
	},
	textInputContainer: {
		width: 250,
		backgroundColor: "transparent",
		height: 50,
		borderRadius: 15,
		borderColor: "blue",
		borderStyle: "solid",
		borderWidth: 2
	},
	textInput: {
		fontFamily: "Roboto",
		height: 33,
		fontSize: 18,
		backgroundColor: "#979797",
		opacity: 0.1
	}
};

export default (styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.COLOURS.WHITE,
		flex: 1,
		justifyContent: "center",
	},
	nextBtn: {
		width: 200,
		borderRadius: 10,
		height: 60,
		elevation: 5
	},
	navContainer: {
		flexDirection: "row",
		padding: 5
	},
	closeIcon: {

	},
	placeIcon: {

	}
}));
