import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "galio-framework";
import PlacesInput from "react-native-places-input";
import { Ionicons } from "@expo/vector-icons";

const LocationBox = ({ label, isEmpty, address, handleInput, setLocation }) => {
	return (
		<View>
			<Text muted style={{ alignSelf: "flex-start", left: 10 }}>{label}</Text>
			<PlacesInput
				onChangeText={(text) => text ? handleInput(true) : null}
				query={!isEmpty && address}
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
		</View>
	)
};

LocationBox.propTypes = {
	label: PropTypes.string.isRequired,
	isEmpty: PropTypes.bool.isRequired,
	handleInput: PropTypes.func.isRequired,
	address: PropTypes.string,
	setLocation: PropTypes.func
};

export default LocationBox;
