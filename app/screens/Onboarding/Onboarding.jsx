import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Block, Text } from "galio-framework";
import Theme from "../../constants/Theme";
import { useNavigation } from '@react-navigation/native';

const Onboarding = props => {
	const navigation = useNavigation();
	const { image, height, width, styles, onAuth } = props;
	//console.log(navigation);
	return (
		<Block style={styles.slide}>
			<Image
				style={styles.image}
				source={image}
				resizeMode={"contain"}
				height={height}
				width={width}
			/>
			<Block style={styles.authContainer}>
				<TouchableOpacity style={styles.signupBtn} onPress={() => onAuth("SignUp")}>
					<Text color={Theme.COLOURS.WHITE} style={styles.authBtnText} bold>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.loginBtn} onPress={() => onAuth("SignIn")}>
					<Text color={Theme.COLOURS.BLACK} style={styles.authBtnText}>Log in</Text>
				</TouchableOpacity>
			</Block>
		</Block>
	);
};

Onboarding.propTypes = {
	image: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	styles: PropTypes.object.isRequired,
	onAuth: PropTypes.func.isRequired
};

export default Onboarding;
