import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import AuthContext from "../../navigation/context";
import Theme from "../../constants/Theme";

export default class Main extends Component {
	static authContext = AuthContext;

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const user = this.context;
	}

	// Method to update state
	setUser = (user) => {
		this.setState((prevState) => ({ user }));
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Welcome to the Main Screen </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	text: {
		fontSize: 25,
		fontFamily: "Arciform",
		paddingHorizontal: 20

	}
});
