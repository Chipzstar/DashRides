import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { Block, Button, Text } from "galio-framework";
import Theme from "../../../constants/Theme";
import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import NumberFormat from "react-number-format";
import SvgCarIcon from "../../../components/SvgCarIcon";
import DashIcons from "../../../components/DashIcons";
import LottieView from "lottie-react-native";
import styles from "./styles";
import { createDashRequest } from "../../../config/Fire";
import AuthContext from "../../../navigation/context";

export default class MakePayment extends Component {
	static contextType = AuthContext;

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
				price: 0.0
			},
			rideOptions: [
				{
					title: "Ride A",
					passengers: 4,
					arrivalTime: "10:00 - 10:07 arrival",
					price: 5.00,
					isSelected: false
				},
				{
					title: "Ride B",
					passengers: 7,
					arrivalTime: "10:00 - 10:07 arrival",
					price: 7.50,
					isSelected: false
				},
				{
					title: "Ride C",
					passengers: 6,
					arrivalTime: "12:00 - 13:30 arrival",
					price: 3.50,
					isSelected: false
				}
			]
		};
		this.animation = React.createRef();
	}

	componentDidMount() {
		console.log("Route Params", this.props.route.params);
		let { lat, lng } = this.props.route.params.source.geometry.location;
		this.setState({
			source: {
				...this.state.source,
				latitude: lat,
				longitude: lng
			}
		});
	}

	validateConfirmation = () => {
		const { user } = this.context;
		console.log(Object.values(this.state.selection));
		if (Object.values(this.state.selection).some(x => x === "")) {
			Alert.alert("No selection made!", "Please select your dash ride before continuing :)");
		} else {
			createDashRequest(user().uid, { ...this.props.route.params, ...this.state.selection })
				.then(res => console.log(res));
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
						<LottieView
							ref={animation => this.animation = animation}
							source={require("../../../assets/animations/13477-sample.json")}
							autoPlay
							loop
							style={{ width: 300, height: 300 }}
							enableMergePathsAndroidForKitKatAndAbove
						/>
						<Text style={styles.successText} size={18}>{"hang on. \nwe're finding you a driver"}</Text>
					</Block>
				) : (
					<View style={{ flex: 0.55, alignItems: "center" }}>
						<Block style={styles.menuContainer}>
							<Text style={styles.header}>Time To Pick A Dash!</Text>
							<FlatList
								contentContainerStyle={{ flexGrow: 1 }}
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
											<NumberFormat
												displayType="text"
												value={item.price}
												prefix="£"
												decimalScale="2"
												fixedDecimalScale
												renderText={(text) => <Text
													color={item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}
													size={24}>{text}</Text>}
											/>
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
								onPress={this.validateConfirmation}
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
