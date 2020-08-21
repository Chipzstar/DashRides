import React, { useState } from "react";
import PropTypes from "prop-types";
import { FlatList, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View } from "react-native";
import { Text } from "galio-framework";
import Theme from "../constants/Theme";
import DashIcons from "./DashIcons";

if (Platform.OS === "android") {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordian = props => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.5}
				style={expanded ? styles.rowExpanded : styles.rowCollapsed}
				onPress={toggleExpand}
			>
				<DashIcons
					name={"plus"}
					size={25}
					color={expanded ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}
				/>
				<Text
					style={[styles.title, { color: expanded ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY }]}>
					{props.title}
				</Text>
			</TouchableOpacity>
			<View style={styles.parentHr}/>
			{expanded &&
			<View>
				<FlatList
					extraData={props.content}
					data={props.content}
					numColumns={1}
					scrollEnabled={false}
					renderItem={({ item, index }) => (
						<View>
							{item.description &&
							<Text size={15} style={{ paddingTop: 10, paddingLeft: 20 }}>{item.description}</Text>}
							<TouchableOpacity
								activeOpacity={0.75}
								style={styles.button}
								onPress={() => props.update(index)}>
								<Text size={18} color={item.isSelected ? Theme.COLOURS.BUTTON : Theme.COLOURS.SECONDARY}>{item.name}</Text>
							</TouchableOpacity>
							<View
								style={[styles.itemDivider, { borderColor: item.isSelected ? Theme.COLOURS.BUTTON : Theme.COLOURS.HORIZONTAL_RULE }]}/>
						</View>
					)}
				/>
			</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		fontFamily: "Roboto",
		marginVertical: 10
	},
	button: {
		width: "100%",
		height: 60,
		alignItems: "center",
		paddingHorizontal: 35,
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	title: {
		fontSize: 24,
		textTransform: "uppercase",
		paddingLeft: 10
	},
	itemText: {
		fontSize: 18
	},
	itemActive: {
		fontSize: 12,
		color: Theme.COLOURS.GREEN
	},
	itemInActive: {
		color: Theme.COLOURS.DARK_GREY
	},
	rowCollapsed: {
		flexDirection: "row",
		justifyContent: "flex-start",
		height: 52,
		paddingLeft: 25,
		paddingRight: 18,
		alignItems: "center",
		borderRadius: 15,
		borderWidth: 1,
		elevation: 5,
		zIndex: 15,
		shadowRadius: 15,
		backgroundColor: Theme.COLOURS.WHITE,
		borderColor: "rgba(0, 0, 0, 0.1)"
	},
	rowExpanded: {
		flexDirection: "row",
		justifyContent: "flex-start",
		height: 52,
		paddingLeft: 25,
		paddingRight: 18,
		alignItems: "center",
		borderRadius: 15,
		elevation: 2,
		backgroundColor: Theme.COLOURS.PRIMARY
	},
	parentHr: {
		height: 1,
		color: Theme.COLOURS.BLACK,
		width: "100%"
	},
	itemDivider: {
		borderWidth: 1.5,
		width: "100%"
	}
});

Accordian.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.array.isRequired,
	update: PropTypes.func.isRequired
}

export default Accordian;
