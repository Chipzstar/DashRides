import React, { Component } from "react";
import { View, Alert, TextInput, StyleSheet } from "react-native";
import { Block, Button, Input, Text } from "galio-framework";
import Theme from "../../../constants/Theme";
import AuthContext from "../../../navigation/context";

export default class Login extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			firstName: "",
			lastName: "",
			password: "",
			phone: ""
		};
	}

	componentDidMount() {}

	onLogin = () => {
		const { username, firstName, lastName, email, password, phone } = this.state;
		const { signIn } = this.context;
		signIn();
	}

	render() {
		const { navigation } = this.props;
		return (
			<Block flex style={styles.container}>
				<Block>
					<Text h2>Login</Text>
				</Block>
				<Input
					value={this.state.username}
					onChangeText={(username) => this.setState({ username })}
					placeholder={"Username"}
					style={styles.input}
				/>
				<Input
					placeholder="password"
					style={styles.input}
					value={this.state.password}
					onChangeText={(password) => this.setState({ password })}
					password
					viewPass
				/>
				<Block center>
					<Button
						style={styles.button}
						color={Theme.COLOURS.SECONDARY}
						textStyle={{ color: Theme.COLOURS.BLACK }}
						onPress={() => this.onLogin()}
					>
						Login
					</Button>
				</Block>
			</Block>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		color: Theme.COLOURS.BLACK,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10
	}

});
