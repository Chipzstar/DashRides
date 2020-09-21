import firebase from "firebase/app";
import "firebase/auth";
import React, { Component } from "react";
import AuthContext from "../../../navigation/context";
import Theme from "../../../constants/Theme";
import { Block, Button, Text } from "galio-framework";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import UserPermissions from "../../../permissions/UserPermissions";
import { updateUserCoordinates } from "../../../config/Fire";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";

export default class Main extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			latitude: 0,
			longitude: 0,
			error: null,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005
		};
	}

	async componentDidMount() {
		const { user } = this.context;
		console.log(await UserPermissions.registerPushNotifications(user))
		if(user.displayName !== null) this.setState({ displayName: user.displayName });
		await UserPermissions.getLocationPermission();
		let location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.BestForNavigation,
			enableHighAccuracy: true,
			maximumAge: 2000,
			timeout: 20000
		});
		this.setState({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			user: firebase.auth().currentUser
		}, async () => console.log(await updateUserCoordinates(this.state.user, location.coords)));
		console.log("Expo location:", location);
	}

	render() {
		const { navigation } = this.props;
		const { displayName, latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
		return (
			<Block style={styles.container}>
				<StatusBar hidden/>
				<MapView
					provider={PROVIDER_GOOGLE}
					region={{
						latitude,
						longitude,
						latitudeDelta,
						longitudeDelta
					}}
					showsCompass={true}
					showsUserLocation={true}
					followsUserLocation={true}
					style={styles.map}
				/>
				<Block style={styles.menuContainer}>
					<Text style={styles.welcomeText}>Hey {displayName}, nice to see you</Text>
					<Block flex center style={styles.btnContainer}>
						<Button round color={Theme.COLOURS.PRIMARY} style={styles.searchBtn}
						        onPress={() => navigation.navigate("SearchRide", {
							        lat: latitude,
							        long: longitude
						        })}>
							<Text color={Theme.COLOURS.WHITE} size={24} bold>Need A Ride</Text>
						</Button>
					</Block>
				</Block>
			</Block>
		);
	}
}
