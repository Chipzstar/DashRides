import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

const CustomTabBar = ({ state, descriptors, navigation }) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	const target = state.routes === undefined ? state : state["routes"]
	console.log("State -> target:", state["routes"][1].state.routeNames[2]);
	/*console.log("Descriptors:", descriptors);
	console.log("Navigation:", navigation);
	console.log("Focused options:", focusedOptions);*/

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}
	return (
		<View style={{ flexDirection: 'row' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityStates={isFocused ? ['selected'] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1, height: 70 }}
					>
						<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

CustomTabBar.propTypes = {};

export default CustomTabBar;
