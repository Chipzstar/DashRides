import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../constants/Theme";

export const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
export const { height: HEIGHT } = Dimensions.get("window"); //Max Height of phone screen

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
	locationContainer: {
		flexDirection: "row",
		padding: 5
	},
	closeIcon: {
		position: "relative",
		borderColor: "blue",
		borderStyle: "solid",
		borderWidth: 2
	},
	placeIcon: {
		right: 15,
	}
}));
