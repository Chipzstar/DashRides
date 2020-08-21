import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import DashIcons from "../../components/DashIcons";
import Theme from "../../constants/Theme";
import { Text, Block } from "galio-framework";
import Accordian from "../../components/Accordian";

const preferences = [
	{
		title: "Driver",
		content: [
			{
				key: String("1"),
				name: "male",
				isSelected: false
			},
			{
				key: String("2"),
				name: "female",
				isSelected: false
			},
			{
				key: String("3"),
				name: "no preference",
				isSelected: false
			}
		]
	},
	{
		title: "Experience",
		content: [
			{
				key: String("1"),
				name: "let's have a natter",
				isSelected: false
			},
			{
				key: String("2"),
				name: "nice and silent",
				isSelected: false
			},
			{
				key: String("3"),
				name: "heavy on the tunes",
				isSelected: false
			},
			{
				key: String("4"),
				name: "easy on the tunes",
				isSelected: false
			},
			{
				key: String("5"),
				name: "no preference",
				isSelected: false
			}
		]
	},
	{
		title: "Environment",
		content: [
			{
				key: String("1"),
				name: "yes",
				description: "Would you like to donate 50p to offset the carbon produced by this journey?",
				isSelected: false
			},
			{
				key: String("2"),
				name: "no",
				isSelected: false
			}
		]
	}
];

const RiderPreferences = ({ route, navigation }) => {
	//useEffect(() => console.log(route.params));
	return (
		<View style={styles.container}>
			<Block style={styles.navContainer}>
				<TouchableOpacity onPress={() => navigation.pop()} style={{}}>
					<DashIcons name={"back"} color={"#4B545A"} size={28}/>
				</TouchableOpacity>
			</Block>
			<Block style={styles.mainContainer}>
				<Text style={styles.header}>RIDE PREFERENCES</Text>
				<Text muted size={24}>Let's create your ideal ride!</Text>
			</Block>
			<Block style={styles.optionsContainer}>
				<Accordian title={preferences[0].title} data={preferences[0].content}/>
				<Accordian title={preferences[1].title} data={preferences[1].content}/>
				<Accordian title={preferences[2].title} data={preferences[2].content}/>
				{/*<Block style={{
					borderColor: "red",
					borderStyle: "solid",
					borderWidth: 2,
					fontFamily: "Roboto",
					fontSize: 30
				}} height={300}>
					<Accordion
						headerStyle={{
							borderColor: "green",
							borderStyle: "solid",
							borderWidth: 2,
							display: "flex",
						}}
						dataArray={driverData}
						icon={<DashIcons name={"plus"} size={25} color={"#4B545A"}/>}
					/>
				</Block>*/}
			</Block>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.COLOURS.WHITE,
		flex: 1,
		padding: 20,
		justifyContent: "flex-start"
	},
	mainContainer: {
		flex: 0.2,
		justifyContent: "space-between",
		paddingVertical: 10
	},
	optionsContainer: {
		flex: 0.8,
		justifyContent: "flex-start",
		paddingTop: 10
	},
	header: {
		width: 250,
		fontWeight: "bold",
		fontSize: 36,
		fontFamily: "Roboto",
		textTransform: "uppercase",
		color: Theme.COLOURS.HEADER
	}
});

export default RiderPreferences;
