import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles, { WIDTH } from "./styles";
import { Block, Input } from "galio-framework";
import * as PropTypes from "prop-types";
//assets
import SvgCallIcon from "../../../components/SvgCallIcon";

class NewRide extends React.Component {
	render() {
		let { route, navigation } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden />
				<MapView
					provider={PROVIDER_GOOGLE}
					showsCompass={true}
					showsUserLocation={true}
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				/>
				<Block styles={{
					flex: 0.35,
					borderColor: "red",
					borderStyle: "solid",
					borderWidth: 2
				}}>
					<Block style={{
						flexDirection: "row",
						alignItems: "center"
					}}>
						<Input
							style={{width: WIDTH * 0.6, borderRadius: 15 }}
							placeholder={"send a message..."}/>
						<TouchableOpacity activeOpacity={0.5}>
							<SvgCallIcon/>
						</TouchableOpacity>
					</Block>
				</Block>
			</View>
		);
	}
}

NewRide.propTypes = {
	route: PropTypes.any,
	navigation: PropTypes.any
};

export default NewRide;
