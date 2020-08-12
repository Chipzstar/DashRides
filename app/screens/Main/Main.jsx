import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AuthContext from "../../navigation/context";
import Theme from "../../constants/Theme";
import { Button, Text } from "galio-framework";

export default class Main extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			displayName: ""
		};
	}

	/*componentDidMount() {
		const { user } = this.context;
		console.log(user());
		if(user()) this.setState({ displayName: user().displayName });
	}*/

	render() {
		const { signOut } = this.context;
		return (
			<View style={styles.container}>
				<Text h2 center style={styles.text}>Welcome! nice to see you</Text>
				<Button color={Theme.COLOURS.SECONDARY} onPress={() => signOut()}>
					<Text bold size={20}>Sign Out</Text>
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	text: {
		paddingTop: 20,
		fontFamily: "Arciform",
		paddingHorizontal: 20
	}
});
