import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	LayoutAnimation,
	Platform,
	UIManager,
	FlatList,
	ScrollView
} from "react-native";
import { Text } from "galio-framework";
import Theme from "../constants/Theme";
import DashIcons from "./DashIcons";

export default class Accordian extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			expanded: false
		};
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={this.state.expanded ? styles.rowExpanded : styles.rowCollapsed}
					onPress={() => this.toggleExpand()}
				>
					<DashIcons
						name={"plus"}
						size={25}
						color={this.state.expanded ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}
					/>
					<Text
						style={[styles.title, { color: this.state.expanded ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY }]}>
						{this.props.title}
					</Text>
				</TouchableOpacity>
				<View style={styles.parentHr}/>
				{this.state.expanded &&
				<View style={{}}>
					<FlatList
						data={this.state.data}
						numColumns={1}
						scrollEnabled={false}
						renderItem={({ item , index}) =>
							<View>
								{item.description && <Text size={15} style={{paddingTop: 10, paddingLeft: 20}}>{item.description}</Text>}
								<TouchableOpacity
									activeOpacity={0.75}
									style={styles.button}
									onPress={() => this.onClick(index)}>
									<Text size={18} color={item.isSelected ? Theme.COLOURS.BUTTON : Theme.COLOURS.SECONDARY}>{item.name}</Text>
								</TouchableOpacity>
								<View style={[styles.itemDivider, {borderColor: item.isSelected ? Theme.COLOURS.BUTTON : Theme.COLOURS.HORIZONTAL_RULE}]}/>
							</View>
						}/>
				</View>}
			</View>
		);
	}

	onClick = (INDEX) => {
		const data = this.state.data.slice();
		let newData = [];
		if(!data[INDEX]["isSelected"]) {
			newData = data.map((item, index) => {
				return INDEX !== index ? {...item, isSelected: false} : { ...item, isSelected: true }
			})
		}
		console.log("New data:", newData);
		this.setState({ data: newData });
	};

	toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !this.state.expanded });
	};
}

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
		justifyContent: "flex-start",
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
