import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../constants/Theme";

export const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
export const { height: HEIGHT } = Dimensions.get("window"); //Max Height of phone screen

export default (styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: Theme.COLOURS.WHITE
	},
	welcomeText: {
		fontWeight: "bold",
		fontFamily: "Roboto",
		paddingTop: 10,
		paddingHorizontal: 20,
		fontSize: 20,
		color: "#979797"
	},
	map: {
		flex: 0.82,
		width: WIDTH
	},
	menuContainer: {
		flex: 0.18,
		justifyContent: "center",
		paddingVertical: 5
	},
	btnContainer: {
		width: WIDTH * 0.9
	},
	searchBtn: {
		width: WIDTH * 0.9,
		height: 70,
		borderRadius: 30,
		elevation: 3
	},
	subBtnContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
}));
