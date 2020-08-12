import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AuthContext from "../../navigation/context";
import Theme from "../../constants/Theme";
import { Block, Button, Text } from "galio-framework";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Emoji from "../../components/Emoji";

export default class Main extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			coordinates: [
				{ name: "Burger", latitude: 51.712923, longitude: -122.4351431 },
				{ name: "Pizza", latitude: 51.65371, longitude: -122.421646 },
				{ name: "Soup", latitude: 51.192910, longitude: -122.4165628 },
				{ name: "Sushi", latitude: 51.716281, longitude: -122.4527787 },
				{ name: "Curry", latitude: 51.329913, longitude: -122.4596065 }
			]
		};
	}

	componentDidMount() {
		const { user } = this.context;
		console.log(user());
		if(user()) this.setState({ displayName: user().displayName });
	}

	render() {
		const { signOut } = this.context;
		return (
			<Block style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					region={{
						latitude: 51.545033,
						longitude: 0.160479,
						latitudeDelta: 0.09,
						longitudeDelta: 0.035
					}}
					style={styles.map}
				/>
				<Block flex style={styles.menuContainer}>
					<Text h6 style={styles.welcomeText}>Welcome! nice to see you</Text>
					<Block flex center style={styles.btnContainer}>
						<Block center>
							<Button round color={Theme.COLOURS.BUTTON} style={styles.searchBtn}>
								<Text color={Theme.COLOURS.WHITE} size={26} bold>SEARCH A RIDE</Text>
							</Button>
						</Block>
						<Block style={styles.subBtnContainer}>
							<Button round color={Theme.COLOURS.BUTTON} style={styles.subBtn}>
								<Text color={Theme.COLOURS.WHITE} size={20}>Favourites&nbsp;
									<Emoji name={"favourites"} color={"yellow"} size={18}/>
								</Text>
							</Button>
							<Button round color={Theme.COLOURS.BUTTON} style={styles.subBtn}>
								<Text color={Theme.COLOURS.WHITE} size={20}>What's Hot&nbsp;
									<Emoji name={"whats-hot"} color={"orange"} size={18}/>
								</Text>
							</Button>
						</Block>
					</Block>
					<Button style={{ alignSelf: "flex-end" }} size={"small"} color={Theme.COLOURS.SECONDARY}
					        onPress={() => signOut()}>
						<Text bold size={20}>Sign Out</Text>
					</Button>
				</Block>
			</Block>
		);
	}
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: "space-between"
	},
	welcomeText: {
		paddingTop: 20,
		fontFamily: "Arciform",
		paddingHorizontal: 20
	},
	map: {
		flex: 0.55,
		width
	},
	menuContainer: {
		flex: 0.45,
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 2,
		justifyContent: "flex-start"
	},
	btnContainer: {
		width: width * 0.9
	},
	searchBtn: {
		width: width * 0.9
	},
	subBtn: {},
	subBtnContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});
