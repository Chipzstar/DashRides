import React, { Component } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Block, Text } from "galio-framework";
import Theme from "../../constants/Theme";
import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import SvgCarIcon from "../../components/SvgCarIcon";
import DashIcons from "../../components/DashIcons";

const RideOptions = [
	{
		title: "Ride A",
		passengers: 4,
		arrivalTime: "10:00 - 10:07 arrival",
		price: "5.00"
	},
	{
		title: "Ride B",
		passengers: 7,
		arrivalTime: "10:00 - 10:07 arrival",
		price: "7.50"
	}
]

export default class MakePayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}
		};
	}

	componentDidMount() {
		let { lat, lng } = this.props.route.params.source.geometry.location;
		this.setState({
			source: {
				...this.state.source,
				latitude: lat,
				longitude: lng
			}
		}, () => console.log(this.state.source));
	}

	render() {
		return (
			<Block style={styles.container}>
				<StatusBar hidden/>
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
					region={this.state.source}
				/>
				<Block style={styles.menuContainer}>
					<Text style={styles.header}>Time To Pick A Dash!</Text>
					<Block style={styles.dashRideBox}>
						<SvgCarIcon/>
						<Block style={{ paddingRight: 25 }}>
							<Text size={18} style={styles.optionHeader}>Ride A</Text>
							<Text size={14} style={styles.subText}>10:00 - 10:07 arrival</Text>
						</Block>
						<Text style={styles.price}>£5.00</Text>
					</Block>
					<Block style={styles.dashRideBox}>
						<SvgCarIcon/>
						<Block style={{ paddingRight: 25 }}>
							<Text size={18} style={styles.optionHeader}>Ride B</Text>
							<Text size={14} style={styles.subText}>10:00 - 10:07 arrival</Text>
						</Block>
						<Text style={styles.price}>£7.50</Text>
					</Block>
				</Block>
				<Block style={styles.paymentContainer}>
					<Block style={{
						flex: 0.4, flexDirection: "row", alignItems: "center"
					}}>
						<Block style={styles.card}>
							<DashIcons name={"visa"} size={40}/>
							<Text size={14} color={Theme.COLOURS.SUB_TEXT} bold>VISA ***** 4700</Text>
							<TouchableOpacity
								style={{
									flex: 1,
									alignItems: "center",
								}}
								onPress={() => console.log("Card drop down opened...")}
							>
								<DashIcons name={"dropdown-arrow"} size={14} color={"grey"}/>
							</TouchableOpacity>
						</Block>
						<Button style={styles.recent}>
							<DashIcons name={"clock"} size={22}/>
						</Button>
					</Block>
					<Button style={styles.confirmBtn} color={"#F2F2F2"}>
						<Text style={styles.price}>Confirm your dash</Text>
					</Button>
				</Block>
			</Block>
		);
	}
}
const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
const { height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "Roboto",
		backgroundColor: Theme.COLOURS.WHITE
	},
	menuContainer: {
		flex: 0.3,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 10,
		elevation: 10
	},
	dashRideBox: {
		flex: 0.45,
		backgroundColor: Theme.COLOURS.WHITE,
		width: "100%",
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 10,
		elevation: 5
	},
	map: {
		flex: 0.45,
		width: WIDTH
	},
	paymentContainer: {
		marginTop: 10,
		flex: 0.25,
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "rgba(0,0,0,0.1)"
	},
	subText: {
		color: Theme.COLOURS.SUB_TEXT
	},
	header: {
		fontWeight: "bold",
		fontSize: 18,
		color: Theme.COLOURS.SUB_HEADER,
		paddingTop: 15
	},
	optionHeader: {
		fontSize: 18,
		color: Theme.COLOURS.SECONDARY
	},
	card: {
		flex: 0.7,
		height: 45,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: Theme.COLOURS.WHITE,
		elevation: 5,
		paddingLeft: 10
	},
	recent: {
		flex: 0.3,
		borderRadius: 30,
		backgroundColor: Theme.COLOURS.WHITE
	},
	price: {
		fontSize: 24,
		color: Theme.COLOURS.SECONDARY
	},
	confirmBtn: {
		flex: 0.6,
		width: 343,
		borderRadius: 30,
		elevation: 3
	},
	btnSelected: {
		backgroundColor: Theme.COLOURS.PRIMARY,
		color: Theme.COLOURS.WHITE
	}
});
