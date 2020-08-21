import {StyleSheet, Dimensions} from "react-native";
import Theme from "../../../constants/Theme";

const {width: WIDTH} = Dimensions.get("window"); //Max Width of phone screen
const {height: HEIGHT} = Dimensions.get("window"); //Max Height of phone screen

export default (styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.COLOURS.WHITE,
		flex: 1,
		justifyContent: "flex-start",
		fontFamily: "Roboto"
	},
	navContainer: {
		padding: 20
	},
	mainContainer: {
		flex: 0.2,
		justifyContent: "space-between",
		padding: 20
	},
	optionsContainer: {
		flex: 0.7,
		justifyContent: "flex-start",
		paddingTop: 10,
		padding: 20
	},
	header: {
		width: 250,
		fontWeight: "bold",
		fontSize: 36,
		fontFamily: "Roboto",
		textTransform: "uppercase",
		color: Theme.COLOURS.HEADER
	},
	btnContainer: {
		flex: 0.1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Theme.COLOURS.WHITE,
		height: 70,
		borderTopWidth: 1,
		borderTopColor: "rgba(0,0,0, 0.4)",
		elevation: 3
	},
	btnText: {
		fontSize: 20,
		color: Theme.COLOURS.SECONDARY
	}
}));
