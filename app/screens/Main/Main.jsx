import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import AuthContext from "../../navigation/context";
import Theme from "../../constants/Theme";
import { Block, Button, Text } from "galio-framework";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import UserPermissions from "../../permissions/UserPermissions";

export default class Main extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			latitude: 0,
			longitude: 0,
			error: null,
			latitudeDelta: 0.09,
			longitudeDelta: 0.035,
			coordinates: [
				{ name: "Burger", latitude: 51.712923, longitude: -122.4351431 },
				{ name: "Pizza", latitude: 51.65371, longitude: -122.421646 },
				{ name: "Soup", latitude: 51.192910, longitude: -122.4165628 },
				{ name: "Sushi", latitude: 51.716281, longitude: -122.4527787 },
				{ name: "Curry", latitude: 51.329913, longitude: -122.4596065 }
			]
		};
	}

	async componentDidMount() {
		await UserPermissions.getLocationPermission();
		let location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.BestForNavigation,
			enableHighAccuracy: true,
			maximumAge: 2000,
			timeout: 20000,
		});

		this.setState({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		});
		console.log("Expo location:", location);
		/*navigator.geolocation.getCurrentPosition(position => {
				console.log("Web API location:", position);
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null
				});
			}, error => this.setState({ error: error.message }),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 2000
			});*/
		const { user } = this.context;
		console.log(user());
		if (user()) this.setState({ displayName: user().displayName });
	}

	homePlace = {
		description: 'Home',
		geometry: { location: { latitude: 48.8152937, longitude: 2.4597668 } },
	};

	workPlace = {
		description: 'Work',
		geometry: { location: { latitude: 48.8496818, longitude: 2.2940881 } },
	};

	render() {
		const { latitude, longitude } = this.state;
		const { signOut } = this.context;
		return (
			<Block style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					region={{
						latitude,
						longitude,
						latitudeDelta: 0.09,
						longitudeDelta: 0.035
					}}
					style={styles.map}
				>
					<Marker coordinate={{ latitude, longitude }}/>
				</MapView>
				<Block flex style={styles.menuContainer}>
					<Text h6 style={styles.welcomeText}>Welcome! nice to see you</Text>
					<Block flex center style={styles.btnContainer}>
						<Block center>
							<Button round color={Theme.COLOURS.PRIMARY} style={styles.searchBtn}>
								<Text color={Theme.COLOURS.WHITE} size={26} bold>NEED A RIDE</Text>
							</Button>
						</Block>
						{/*<Block style={styles.subBtnContainer}>
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
						</Block>*/}
					</Block>
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
		flex: 0.8,
		width
	},
	menuContainer: {
		flex: 0.2,
		justifyContent: "flex-start"
	},
	btnContainer: {
		width: width * 0.9
	},
	searchBtn: {
		width: width * 0.9
	},
	subBtn: {

	},
	subBtnContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});
