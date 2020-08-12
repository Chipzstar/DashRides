import {StyleSheet, Dimensions} from "react-native";
import Theme from "../../constants/Theme";

const {width, height} = Dimensions.get("window"); //Max Width of phone screen

export default (styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.PRIMARY,
		opacity: .9,
		paddingBottom: 10
	},
	formHeader: {
		fontFamily: "Arciform",
		paddingTop: 30,
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
	btnText: {
		fontSize: 20
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
	}
}));
