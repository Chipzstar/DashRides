import {StyleSheet, Dimensions} from "react-native";
import Theme from "../../../constants/Theme";

export const {width: WIDTH} = Dimensions.get("window"); //Max Width of phone screen
export const {height: HEIGHT} = Dimensions.get("window"); //Max Height of phone screen

export default (styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
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
	dashRideBox: {
		flexGrow: 0.475,
		backgroundColor: Theme.COLOURS.WHITE,
		width: "92.5%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "center",
		borderRadius: 10,
		elevation: 3,
		paddingVertical: 20,
		paddingHorizontal: 10,
		shadowRadius: 10,
		marginBottom: 20
	},
	map: {
		flex: 0.45,
		width: WIDTH
	},
	paymentContainer: {
		marginTop: 10,
		flex: 0.45,
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "rgba(0,0,0,0.1)"
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
	recent: {
		flex: 0.3,
		borderRadius: 30,
		backgroundColor: Theme.COLOURS.WHITE,
		elevation: 5
	},
	confirmBtn: {
		flex: 0.6,
		width: 343,
		borderRadius: 30,
		elevation: 3
	},
	btnSelected: {
		backgroundColor: Theme.COLOURS.BUTTON
	},
	textSelected: {
		color: Theme.COLOURS.WHITE
	},
	successText: {
		textAlign: "center",
		fontFamily: "Lato-Regular",
		color: Theme.COLOURS.PRIMARY
	}
}));
