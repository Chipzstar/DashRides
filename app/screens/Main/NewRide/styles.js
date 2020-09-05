import {StyleSheet, Dimensions} from "react-native";
import Theme from "../../../constants/Theme";

export const {width: WIDTH} = Dimensions.get("window"); //Max Width of phone screen
export const {height: HEIGHT} = Dimensions.get("window"); //Max Height of phone screen

export default (styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		fontFamily: "Roboto",
		backgroundColor: Theme.COLOURS.WHITE
	},
	menuContainer: {
		flex: 0.55,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingRight: 10,
		elevation: 1
	},
	map: {
		flex: 0.65,
		width: WIDTH
	},
	header: {
		fontWeight: "bold",
		fontSize: 18,
		color: Theme.COLOURS.SUB_HEADER,
		paddingVertical: 10
	},
	subText: {
		color: Theme.COLOURS.SUB_TEXT
	},
	card: {
		flex: 0.7,
		height: 45,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: Theme.COLOURS.WHITE,
		elevation: 5,
		paddingLeft: 10
	},
	successText: {
		textAlign: "center",
		fontFamily: "Lato-Regular",
		color: Theme.COLOURS.PRIMARY
	}
}));
