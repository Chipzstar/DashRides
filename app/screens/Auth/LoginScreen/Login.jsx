import React, { Component } from "react";
import { View, Alert, TextInput, StyleSheet, ScrollView } from "react-native";
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

	render() {
		const { signIn } = this.context;
		return (
			<Block flex style={styles.container}>
				<Block>
					<Text h1 style={styles.signInHeader}>Login</Text>
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
								onChangeText={props.handleChange('email')}
								placeholder={"Email"}
								style={styles.input}
							/>
							<Text style={styles.error} muted>{props.touched.email && props.errors.email}</Text>
							<Input
								placeholder="Password"
								style={styles.input}
								value={props.values.password}
								onChangeText={props.handleChange('password')}
								password
								viewPass
							/>
							<Text style={styles.error} muted>{props.touched.password && props.errors.password}</Text>
							<Block center>
								<Button
									style={styles.button}
									color={Theme.COLOURS.SECONDARY}
									textStyle={{ color: Theme.COLOURS.BLACK }}
									onPress={props.handleSubmit}
								>
									<Text style={styles.btnText}>Login</Text>
								</Button>
							</Block>
						</Block>
					)}
				</Formik>
			</Block>
		);
	}
};
