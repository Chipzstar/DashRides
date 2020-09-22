import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../constants/Theme";

export const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
export const { height: HEIGHT } = Dimensions.get("window"); //Max Height of phone screen

const CALL_ICON_SIZE = 50;
const BACK_BTN_SIZE = 42;

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: 'Lato-Regular',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: Theme.COLOURS.WHITE,
	},
	infoContainer: {
		flex: 0.35,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingRight: 10,
		elevation: 5,
	},
	map: {
		flex: 0.65,
		width: WIDTH,
	},
	details: {
		flex: 0.65,
		width: '100%',
		flexDirection: 'row',
	},
	avatar: {
		backgroundColor: Theme.COLOURS.AVATAR,
		position: 'absolute',
		bottom: HEIGHT * 0.1,
		borderRadius: 70,
		padding: 10,
	},
	subHeader: {
		fontSize: 15,
		color: Theme.COLOURS.SUB_HEADER,
	},
	arrivalText: {
		alignSelf: 'center',
		fontFamily: 'Lato-Bold',
		color: Theme.COLOURS.HEADER,
		fontSize: 21,
	},
	subText: {
		textAlign: 'center',
		fontFamily: 'Lato-Regular',
		color: Theme.COLOURS.HEADER,
	},
	msgInput: {
		width: WIDTH * 0.7,
		height: HEIGHT * 0.075,
		borderRadius: 15,
		borderColor: 'rgba(0,0,0, 0.1)',
	},
	callIcon: {
		width: CALL_ICON_SIZE,
		height: CALL_ICON_SIZE,
		/*borderWidth: 1,
		borderRadius: 25,*/
	},
	backBtn: {
		display: 'flex',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		height: BACK_BTN_SIZE,
		width: BACK_BTN_SIZE,
		top: 20,
		left: 30,
		backgroundColor: Theme.COLOURS.WHITE,
		borderRadius: BACK_BTN_SIZE / 2,
		elevation: 7,
	},
	callBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: CALL_ICON_SIZE+10,
		width: CALL_ICON_SIZE+10,
		borderWidth: 2,
		borderColor: 'rgba(171,184,195, 0.2)',
		borderRadius: 25+10,
	},
});
