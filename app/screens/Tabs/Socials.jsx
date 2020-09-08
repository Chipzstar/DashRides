import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AuthContext from '../../navigation/context';
import { Button, Text } from 'galio-framework';
import Theme from '../../constants/Theme';

export default class Socials extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { signOut } = this.context;
		return (
			<View style={styles.container}>
				<Text style={styles.text}> Welcome to the Socials Screen </Text>
				<Button
					color={Theme.COLOURS.DISABLED}
					style={{ flex: 0.1, alignSelf: 'center' }}
					onPress={() => signOut()}
				>
					<Text bold size={18}>
						Sign Out
					</Text>
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
