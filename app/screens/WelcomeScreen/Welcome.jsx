import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}> Welcome to Dash Rides </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FF931E",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 25,
		textAlign: 'center',
		fontFamily: 'Arciform'
	}
});
