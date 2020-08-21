import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { Input } from "galio-framework";

const LocationBox = (props) => (
	<View style={styles.searchBox}>
		<View>
			<Text style={styles.label}>start</Text>
			<Input>

			</Input>
		</View>
	</View>
);

LocationBox.propTypes = {};

const styles = StyleSheet.create({
	label: {

	}
})

export default LocationBox;
