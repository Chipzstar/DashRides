import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<Text> Welcome to the Profile Screen </Text>
			</View>
		);
	}
}
