import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Socials extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}> Welcome to the Socials Screen </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		fontSize: 20
	}
});
