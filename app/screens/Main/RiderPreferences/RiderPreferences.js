import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import DashIcons from "../../../components/DashIcons";
import { Block, Text } from "galio-framework";
import Accordian from "../../../components/Accordian";
import styles from "./styles";

const RiderPreferences = ({ route, navigation }) => {
	const [selections, addSelection] = useState({ driver: "", experience: "", environment: "" });
	const [clearPrefs, setClearPrefs] = useState(false);
	const [driverPrefs, setDriverPrefs] = useState([]);
	const [experiencePrefs, setExperiencePrefs] = useState([]);
	const [environmentPrefs, setEnvironmentPrefs] = useState([]);

	function updateDriverPrefs(INDEX) {
		let newPrefs = [];
		if (!driverPrefs[INDEX]["isSelected"]) {
			addSelection({ ...selections, driver: driverPrefs[INDEX]["name"] });
			newPrefs = driverPrefs.map((item, index) => {
				return INDEX !== index ? { ...item, isSelected: false } : { ...item, isSelected: true };
			});
			setDriverPrefs(newPrefs);
		}
	}

	function updateExperiencePrefs(INDEX) {
		let newPrefs = [];
		if (!experiencePrefs[INDEX]["isSelected"]) {
			addSelection({ ...selections, experience: experiencePrefs[INDEX]["name"] });
			newPrefs = experiencePrefs.map((item, index) => {
				return INDEX !== index ? { ...item, isSelected: false } : { ...item, isSelected: true };
			});
			setExperiencePrefs(newPrefs);
		}
	}

	function updateEnvironmentPrefs(INDEX) {
		let newPrefs = [];
		if (!environmentPrefs[INDEX]["isSelected"]) {
			addSelection({ ...selections, environment: environmentPrefs[INDEX]["name"] });
			newPrefs = environmentPrefs.map((item, index) => {
				return INDEX !== index ? { ...item, isSelected: false } : { ...item, isSelected: true };
			});
			setEnvironmentPrefs(newPrefs);
		}
	}

	useEffect(() => {
		setDriverPrefs([
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
		]);
		setExperiencePrefs([
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
		]);
		setEnvironmentPrefs([
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
		]);
	}, [clearPrefs]);
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<Accordian
						title={"Driver"}
						content={driverPrefs}
						update={updateDriverPrefs}
					/>
					<Accordian
						title={"Experience"}
						content={experiencePrefs}
						update={updateExperiencePrefs}
					/>
					<Accordian
						title={"Environment"}
						content={environmentPrefs}
						update={updateEnvironmentPrefs}
					/>
				</ScrollView>
			</Block>
			<Block style={styles.btnContainer}>
				<TouchableOpacity
					style={{ flexGrow: 1, flexDirection: "row", justifyContent: "center" }}
					onPress={() => setClearPrefs(!clearPrefs)}
				>
					<Text style={styles.btnText}>Clear All</Text>
				</TouchableOpacity>
				<View style={{ height: 50, borderColor: "#4B545A", borderWidth: 1, opacity: 0.5 }}/>
				<TouchableOpacity
					style={{ flexGrow: 1, flexDirection: "row", justifyContent: "center" }}
					onPress={() => navigation.navigate("Payment", {...selections, ...route.params})}
				>
					<Text style={styles.btnText}>Confirm</Text>
				</TouchableOpacity>
			</Block>
		</View>
	);
};

export default RiderPreferences;
