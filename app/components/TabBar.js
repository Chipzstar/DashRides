import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import DashIcons from "./DashIcons";

const TabBar = ({ state, descriptors, navigation }) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<SafeAreaView>
			<View style={{
				backgroundColor: "#ffffff",
				elevation: 5,
				flexDirection: "row",
				alignItems: "center",
				height: 70
			}}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;
					const iconName = route.name === "Main" ?
						"location" : route.name === "Profile" ?
							"user" : "chat";
					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key
						});
					};

					return (
						<TouchableOpacity
							activeOpacity={1.0}
							key={index}
							accessibilityRole="button"
							accessibilityStates={isFocused ? ["selected"] : []}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ flex: 1, alignItems: "center" }}
						>
							<DashIcons name={iconName} size={40} color={isFocused ? "#03a9f4" : "#222"} />
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default TabBar;
