import React, { Component } from "react";
import { Dimensions, FlatList, View, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { Button, Block, Text } from "galio-framework";
import Theme from "../../constants/Theme";
import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import SvgCarIcon from "../../components/SvgCarIcon";
import DashIcons from "../../components/DashIcons";
import rocket from '../../assets/animations/lottie-rocket.json'

export default class MakePayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			findingDriver: false,
			source: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			},
			selection: {
				title: "",
				passengers: "",
				arrivalTime: "",
				price: ""
			},
			rideOptions: [
				{
					title: "Ride A",
					passengers: 4,
					arrivalTime: "10:00 - 10:07 arrival",
					price: "5.00",
					isSelected: false
				},
				{
					title: "Ride B",
					passengers: 7,
					arrivalTime: "10:00 - 10:07 arrival",
					price: "7.50",
					isSelected: false
				},
				{
					title: "Ride C",
					passengers: 6,
					arrivalTime: "12:00 - 13:30 arrival",
					price: "3.50",
					isSelected: false
				}
			]
		};
	}

	validateConfirmation = () => {
		console.log(Object.values(this.state.selection));
		if (Object.values(this.state.selection).some(x => x === "")) {
			Alert.alert("No selection made!", "Please select your dash ride before continuing :)");
		} else {
			this.setState({ findingDriver: true });
		}
	};

	toggleOption = (INDEX) => {
		let updatedRideOptions = this.state.rideOptions.slice().map((item, index) => {
			if (INDEX === index) {
				item["isSelected"] = true;
				let { isSelected, ...selection } = item;
				this.setState({ selection });
			} else {
				item["isSelected"] = false;
			}
			return item;
		});
		this.setState({ rideOptions: updatedRideOptions }, () => console.log(this.state.rideOptions));
	};

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
					region={this.state.source}
				/>
				{this.state.findingDriver ? (
					<Block style={{
						flex: 0.55,
						justifyContent: "center",
						alignItems: "center"
					}}>
						<Image source={rocket} height={234} width={309} />
					</Block>
				) : (
					<View style={{
						flex: 0.55,
						alignItems: "center"
					}}>
						<Block style={styles.menuContainer}>
							<Text style={styles.header}>Time To Pick A Dash!</Text>
							<FlatList
								contentContainerStyle={{
									flexGrow: 1
								}}
								scrollEnabled={true}
								keyExtractor={((item, index) => String(index))}
								data={this.state.rideOptions}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity
											activeOpacity={0.9}
											style={[styles.dashRideBox, item.isSelected && styles.btnSelected]}
											onPress={() => this.toggleOption(index)}
										>
											<SvgCarIcon
												color={item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY} />
											<Block style={{ paddingRight: 25 }}>
												<Text size={18}
												      color={item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}>{item.title}&nbsp;
													<Text small
													      style={item.isSelected && styles.textSelected}>{item.passengers}</Text>
												</Text>
												<Text size={14}
												      style={item.isSelected ? styles.textSelected : styles.subText}>{item.arrivalTime}</Text>
											</Block>
											<Text
												color={item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}
												size={24}>£{item.price}</Text>
										</TouchableOpacity>
									);
								}}
							/>
						</Block>
						<Block style={styles.paymentContainer}>
							<Block style={{
								flex: 0.4, flexDirection: "row", alignItems: "center"
							}}>
								<Block style={styles.card}>
									<DashIcons name={"visa"} size={40} />
									<Text size={14} color={Theme.COLOURS.SUB_TEXT} bold>VISA ***** 4700</Text>
									<TouchableOpacity
										style={{
											flex: 1,
											alignItems: "center"
										}}
										onPress={() => console.log("Card drop down opened...")}
									>
										<DashIcons name={"dropdown-arrow"} size={14} color={"grey"} />
									</TouchableOpacity>
								</Block>
								<Button style={styles.recent}>
									<DashIcons name={"clock"} size={22} />
								</Button>
							</Block>
							<Button
								style={styles.confirmBtn}
								color={"#F2F2F2"}
								onPress={() => this.validateConfirmation()}
							>
								<Text size={24} color={Theme.COLOURS.SECONDARY}>Confirm your dash</Text>
							</Button>
						</Block>
					</View>
				)}
			</View>
		);
	}
}
const { width: WIDTH } = Dimensions.get("window"); //Max Width of phone screen
const { height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "Roboto",
		backgroundColor: Theme.COLOURS.WHITE
	},
	menuContainer: {
		flex: 0.55,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingRight: 10,
		elevation: 1
	},
	dashRideBox: {
		flexGrow: 0.475,
		backgroundColor: Theme.COLOURS.WHITE,
		width: "92.5%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "center",
		borderRadius: 10,
		elevation: 3,
		paddingVertical: 20,
		paddingHorizontal: 10,
		shadowRadius: 10,
		marginBottom: 20
	},
	map: {
		flex: 0.45,
		width: WIDTH
	},
	paymentContainer: {
		marginTop: 10,
		flex: 0.45,
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "rgba(0,0,0,0.1)"
	},
	header: {
		fontWeight: "bold",
		fontSize: 18,
		color: Theme.COLOURS.SUB_HEADER,
		paddingVertical: 10
	},
	subText: {
		color: Theme.COLOURS.SUB_TEXT
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
		backgroundColor: Theme.COLOURS.WHITE,
		elevation: 5
	},
	confirmBtn: {
		flex: 0.6,
		width: 343,
		borderRadius: 30,
		elevation: 3
	},
	btnSelected: {
		backgroundColor: Theme.COLOURS.BUTTON
	},
	textSelected: {
		color: Theme.COLOURS.WHITE
	}
});
