import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class MakePayment extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log(this.props.route.params);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}> Welcome to the MakePayment Screen </Text>
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
