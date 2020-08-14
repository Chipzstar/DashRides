import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Theme from "../constants/Theme";
import { AppLoading } from "expo";

const Loading = ({}) => {
	const [] = useState();
	return (
		<AppLoading/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	text:{
		fontFamily: 'Arciform',
		fontSize: 26,
		textAlign: "center",
		paddingHorizontal: 20
	}
})

export default Loading;
