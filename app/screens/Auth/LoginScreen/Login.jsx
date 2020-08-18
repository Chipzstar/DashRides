import React, { Component } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Block, Button, Input, Text } from "galio-framework";
import Theme from "../../../constants/Theme";
import AuthContext from "../../../navigation/context";
import { Formik } from "formik";
import { signInSchema } from "../validation";
import styles from "../styles";

export default class Login extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props.navigation.dangerouslyGetState());
	}

	render() {
		const { navigation } = this.props;
		const { signIn } = this.context;
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Block flex style={styles.signInContainer}>
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
									value={props.values.email}
									onChangeText={props.handleChange("email")}
									placeholder={"Email"}
									onSubmitEditing={Keyboard.dismiss}
									style={styles.input}
								/>
								<Text style={styles.error} muted>{props.touched.email && props.errors.email}</Text>
								<Input
									placeholder="Password"
									style={styles.input}
									value={props.values.password}
									onChangeText={props.handleChange("password")}
									onSubmitEditing={Keyboard.dismiss}
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
										<Text color={Theme.COLOURS.LINK} onPress={() => navigation.navigate("SignUp")}>Sign up</Text>
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
