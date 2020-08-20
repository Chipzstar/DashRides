import React, {useCallback} from "react";
import { BackHandler, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Block, Text } from "galio-framework";
import Theme from "../../constants/Theme";
import { useNavigation } from '@react-navigation/native';
import dash_rides from "../../assets/images/slider-images/dash-rides.png"
import { StatusBar } from "expo-status-bar";

const Onboarding = ({ image, height, width, styles, onAuth }) => {
	console.log("Onboarding onAuth:", onAuth)
	const navigation = useNavigation();
	return (
		<Block style={styles.slide}>
			<StatusBar translucent style="dark"/>
			<Image
				style={styles.image}
				source={image}
				resizeMode={"contain"}
				height={height}
				width={width}
			/>
			<Block style={styles.authContainer}>
				<TouchableOpacity style={styles.signupBtn} onPress={() => onAuth === undefined ? navigation.navigate("SignUp") : onAuth("SignUp")}>
					<Text color={Theme.COLOURS.WHITE} style={styles.authBtnText} bold>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.loginBtn} onPress={() => onAuth === undefined ? navigation.navigate("SignIn") : onAuth("SignIn")}>
					<Text color={Theme.COLOURS.BLACK} style={styles.authBtnText}>Log in</Text>
				</TouchableOpacity>
			</Block>
		</Block>
	);
};

Onboarding.defaultProps = {
	image: dash_rides
}

Onboarding.propTypes = {
	image: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	styles: PropTypes.object.isRequired,
	onAuth: PropTypes.func
};

export default Onboarding;
