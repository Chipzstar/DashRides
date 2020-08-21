import React, { useEffect, useState } from "react";
import { Block, Button, Text } from "galio-framework";
import * as Location from 'expo-location';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from 'react-native-geocoding';
import Theme from "../../../constants/Theme";
import DashIcons from "../../../components/DashIcons";
import PlacesInput from "react-native-places-input";
import { Ionicons } from "@expo/vector-icons";
import SvgNavIcon from "../../../components/SvgNavIcon";
//styles
import styles, { searchInputStyle } from "./styles";

console.disableYellowBox = true;

const homePlace = {
	description: "Home",
	geometry: { location: { latitude: 48.8152937, longitude: 2.4597668 } }
};

const workPlace = {
	description: "Work",
	geometry: { location: { latitude: 48.8496818, longitude: 2.2940881 } }
};

const GooglePlacesInput = ({ lat, long }, label) => {
	return label === "location" ? (
		<GooglePlacesAutocomplete
			onFail={error => console.warn(error)}
			placeholder='Current Location'
			minLength={3}
			autoFocus={false}
			keyboardShouldPersistTaps={"handled"}
			returnKeyType={"search"}
			listUnderlayColor={"transparent"}
			listViewDisplayed={"auto"}
			fetchDetails={true}
			renderDescription={(row) => row.description}
			currentLocation={true}
			nearbyPlacesAPI='GooglePlacesSearch'
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				let coordinates = details.geometry.location;
				console.log(data, details);
			}}
			query={{
				key: process.env.GOOGLE_PLACES_API_KEY,
				language: "en"
			}}
			styles={searchInputStyle}
			debounce={200}
			//predefinedPlaces={[homePlace, workPlace]}
		/>
	) : (
		<GooglePlacesAutocomplete
			onFail={error => console.warn(error)}
			placeholder='end'
			minLength={3}
			autoFocus={false}
			keyboardShouldPersistTaps={"handled"}
			returnKeyType={"search"}
			listUnderlayColor={"transparent"}
			listViewDisplayed={"auto"}
			fetchDetails={true}
			renderDescription={(row) => row.description}
			currentLocation={true}
			nearbyPlacesAPI='GooglePlacesSearch'
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				let coordinates = details.geometry.location;
				console.log(data, details);
			}}
			query={{
				key: process.env.GOOGLE_PLACES_API_KEY,
				language: "en"
			}}
			styles={searchInputStyle}
			debounce={200}
			//predefinedPlaces={[homePlace, workPlace]}
		/>
	);
};

const reverseGeocodeAsync = async ({ lat, long }) => {
	const addrKeys = ["name", "street", "city", "region", "postalCode"]
	let addressString = "";
	try {
		let addressObj = (await Location.reverseGeocodeAsync({
			latitude: lat,
			longitude: long
		}))[0];
		console.log(addressObj);
		for(let key of addrKeys) {
			addressObj[key] !== null ?
			addressString = addressString.concat(String(addressObj[key]), ", ") : null;
		}
		return addressString.slice(0, -2)
	} catch (e) {
		console.error(e)
	}
}

const SearchRide = ({ route, navigation }) => {
	const [source, setLocation] = useState("");
	const [dest, setDestination] = useState("");
	const [address, setAddress] = useState("");
	const [hasInput, setHasInput] = useState(false);
	const validateNext = () => {
		if (source) {
			navigation.navigate("Preferences", {source, dest});
		} else {
			Alert.alert("Missing Location field!", "Please make sure " +
				"you have entered a location in both fields before" +
				" continuing ", [
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			], { cancelable: false });
		}
	};
	useEffect(() => {
		Geocoder.init(process.env.GOOGLE_PLACES_API_KEY, {language : "en"})
		reverseGeocodeAsync(route.params).then((res) => setAddress(res))
	}, []);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => navigation.pop()} style={{
					margin: 20,
					width: 25
				}}>
					<DashIcons name={"back"} color={"#4B545A"} size={28}/>
				</TouchableOpacity>
				<Block flex center>
					<Block style={styles.navContainer}>
						<Block flex center style={{
							flex: 0.2
						}}>
							<SvgNavIcon/>
						</Block>
						<Block flex center>
							<Text muted style={{ alignSelf: "flex-start", left: 10 }}>start</Text>
							<PlacesInput
								onChangeText={(text) => text ? setHasInput(true) : null}
								query={!hasInput && address}
								stylesContainer={{
									position: "relative",
									alignSelf: "stretch",
									width: 250,
									marginBottom: 15,
									borderRadius: 10,
									backgroundColor: "#F2F2F2"
								}}
								stylesList={{}}
								stylesInput={{
									borderRadius: 10,
									fontFamily: "Roboto",
									fontSize: 18,
									color: "#4B545A"
								}}
								stylesItemText={{
									fontFamily: "Roboto",
									fontSize: 14
								}}
								keyboardShouldPersistTaps="always"
								placeHolder={"Current Location"}
								language="en-UK"
								googleApiKey={process.env.GOOGLE_PLACES_API_KEY}
								onSelect={place => setLocation(place.result)}
								iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
								iconInput={<Ionicons name="md-close-circle-outline" size={30} color="black" style={styles.closeIcon}/>}
							/>
							<Text muted style={{ alignSelf: "flex-start", left: 10 }}>end</Text>
							<PlacesInput
								stylesContainer={{
									position: "relative",
									alignSelf: "stretch",
									width: 250,
									marginBottom: 15,
									borderRadius: 10,
									backgroundColor: "#F2F2F2"
								}}
								stylesList={{}}
								stylesInput={{
									borderRadius: 10,
									fontFamily: "Roboto",
									fontSize: 18,
									color: "#4B545A"
								}}
								stylesItemText={{
									fontFamily: "Roboto",
									fontSize: 14
								}}
								keyboardShouldPersistTaps="always"
								language="en-UK"
								googleApiKey={process.env.GOOGLE_PLACES_API_KEY}
								onSelect={place => setDestination(place.result)}
								iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
								iconInput={<Ionicons name="md-close" size={30} color="black" style={styles.closeIcon}/>}
							/>
						</Block>
					</Block>
					{/*<Block flex>
				<Text muted size={14}>start</Text>
				{GooglePlacesInput(route.params, "location")}
			</Block>
			<Block flex>
				<Text muted size={14}>end</Text>
				{GooglePlacesInput(route.params, "destination")}
			</Block>*/}
					<Block flex center style={{ justifyContent: "center" }}>
						<Button
							style={styles.nextBtn}
							color={Theme.COLOURS.BUTTON}
							onPress={validateNext}
						>
							<Text bold size={20} color={Theme.COLOURS.WHITE}>Next</Text>
						</Button>
					</Block>
				</Block>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SearchRide;
