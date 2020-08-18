import React from "react";
import { Block, Button, Input, Text } from "galio-framework";
import styles, { width, height } from "../screens/Auth/styles";
import Theme from "../constants/Theme";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

const signUpSlide = ({ item, isPassword, onChangeHandler, onNext, onBack, onSubmit, errors }) => (
	<Block style={[{ width, height }, styles.signUpContainer]}>
		<Block>
			<Text
				color={Theme.COLOURS.WHITE}
				style={styles.title}
			>
				{item.title}
			</Text>
			<Input
				type={item.key === "tel" ? "phone-pad" : item.key === "email" ? "email-address" : "default"}
				left
				labelStyles={{ color: Theme.COLOURS.WHITE }}
				label={item.label}
				onChangeText={(text) => onChangeHandler(item.key, text)}
				color={Theme.COLOURS.BLACK}
				password={isPassword}
				styles={{ borderColor: Theme.COLOURS.WHITE }}
			/>
			{errors[item.key] && <Text bold size={18} color={Theme.COLOURS.BLACK}>{errors[item.key]}</Text>}
			{isPassword &&
			<Input
				left
				labelStyles={{ color: Theme.COLOURS.WHITE }}
				label={`CONFIRM ${item.label}`}
				onChangeText={(text) => onChangeHandler("confirmPassword", text)}
				color={Theme.COLOURS.BLACK}
				password={true}
				styles={{ borderColor: Theme.COLOURS.WHITE }}
			/>}
			{isPassword && errors["confirmPassword"] && <Text bold size={18} color={Theme.COLOURS.BLACK}>{errors["confirmPassword"]}</Text>}
		</Block>
		<Block style={{ alignSelf: "flex-end", textAlign: "right" }}>
			<TouchableOpacity onPress={onBack}>
				<Text
					style={{ paddingVertical: 20 }}
					color={Theme.COLOURS.WHITE}>
					Go back
				</Text>
			</TouchableOpacity>
		</Block>
		<Block>
			{item.pageNum === 5 ?  (
				<Button color={Theme.COLOURS.WHITE} style={styles.nextBtn} onPress={onSubmit}>
					<Text bold color={Theme.COLOURS.PRIMARY}>Get Started!</Text>
				</Button>
			): (
				<Button color={Theme.COLOURS.WHITE} style={styles.nextBtn} onPress={onNext}>
				<Text bold color={Theme.COLOURS.PRIMARY}>Next</Text>
				</Button>
			)}
		</Block>
	</Block>
);

signUpSlide.propTypes = {
	item: PropTypes.object.isRequired,
	isPassword: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
	onChangeHandler: PropTypes.func.isRequired,
	onNext: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default signUpSlide;
