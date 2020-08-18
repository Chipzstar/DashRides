import { StyleSheet, Dimensions } from "react-native";
import Theme from "../constants/Theme";

const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
const { height: HEIGHT } = Dimensions.get("window"); //Max Height of phone screen

export default (styles = StyleSheet.create({
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
		paddingVertical: 30
	},
	welcomeText: {
		fontWeight: "500",
		fontSize: 20,
		color: Theme.COLOURS.BLACK,
		textAlign: "center",
		paddingVertical: 30
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
		shadowOffset: { width: 0, height: 4, blur: 4 },
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
	}
}));
