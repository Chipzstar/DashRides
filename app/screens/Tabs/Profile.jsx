import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "galio-framework";
import AuthContext from "../../navigation/context";
import Theme from "../../constants/Theme";

export default class Profile extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { signOut } = this.context;
		return (
			<View style={styles.container}>
				<Text style={styles.text}> Welcome to the Profile Screen </Text>
				<Button
					color={Theme.COLOURS.DISABLED}
					style={{ alignSelf: "center"}}
					onPress={() => signOut()}>
					<Text bold size={18}>Sign Out</Text>
				</Button>
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
