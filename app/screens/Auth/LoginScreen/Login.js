import React, { Component } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Block, Button, Input, Text } from "galio-framework";
import Theme from "../../../constants/Theme";
import AuthContext from "../../../navigation/context";
import { Formik } from "formik";
import { signInSchema } from "../validation";
import styles from "../styles";
import { StatusBar } from "expo-status-bar";

export default class Login extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
	}

	render() {
		const { navigation } = this.props;
		const { signIn } = this.context;
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Block style={styles.signInContainer}>
					<StatusBar hidden/>
					<Block>
						<Text h1 style={styles.signInHeader}>Log in</Text>
					</Block>
					<Formik
						initialValues={{
							email: "",
							password: ""
						}}
						onSubmit={(values, actions) => {
							console.log(values);
							signIn(values);
						}}
						validationSchema={signInSchema}
					>
						{(props) => (
							<Block>
								<Input
									type="email-address"
									value={props.values.email}
									onChangeText={props.handleChange("email")}
									placeholder={"Email"}
									onSubmitEditing={Keyboard.dismiss}
									bgColor="transparent"
									style={styles.input}
								/>
								<Text style={styles.error} muted>{props.touched.email && props.errors.email}</Text>
								<Input
									placeholder="Password"
									style={styles.input}
									value={props.values.password}
									onChangeText={props.handleChange("password")}
									onSubmitEditing={Keyboard.dismiss}
									bgColor="transparent"
									password
									viewPass
								/>
								<Text style={styles.error}
								      muted>{props.touched.password && props.errors.password}</Text>
								<Block center>
									<Button
										style={styles.loginBtn}
										color={Theme.COLOURS.PRIMARY}
										onPress={props.handleSubmit}
									>
										<Text bold color={Theme.COLOURS.WHITE} style={styles.text}>Log In</Text>
									</Button>
								</Block>
								<Block center style={styles.link}>
									<Text style={styles.text}>New user?&nbsp;
										<Text color={Theme.COLOURS.LINK} onPress={() => navigation.navigate("SignUp")}>Sign
											up</Text>
									</Text>
								</Block>
								<Block center style={styles.link}>
									<Text style={styles.text}>Forgot Password?&nbsp;
										<Text color={Theme.COLOURS.LINK}
										      onPress={() => navigation.navigate("ForgotPassword")}>Reset here</Text>
									</Text>
								</Block>
							</Block>
						)}
					</Formik>
				</Block>
			</TouchableWithoutFeedback>
		);
	}
};
