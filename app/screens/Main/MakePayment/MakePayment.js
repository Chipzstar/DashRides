import React, { Component } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import NumberFormat from 'react-number-format';
import LottieView from 'lottie-react-native';
//helpers
import { createDashRequest, getDriverInfo } from '../../../config/Fire';
import { createPickupInfo, updatePickupInfo } from '../../../store/actions/pickupAction';
import { connect } from 'react-redux';
//firebase
import firebase from 'firebase/app';
import 'firebase/database';
//context
import AuthContext from '../../../navigation/context';
//icons
import SvgCarIcon from '../../../components/SvgCarIcon';
import DashIcons from '../../../components/DashIcons';
//styles
import styles from './styles';
import Theme from '../../../constants/Theme';
//constants
import { pickupSchema } from '../../../constants/Schemas';
import { RIDE_STATUS } from '../../../store/actionTypes';

class MakePayment extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			findingDriver: false,
			source: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			},
			selection: {
				title: '',
				passengers: '',
				arrivalTime: '',
				price: 0.0,
			},
			rideOptions: [
				{
					title: 'Ride A',
					passengers: 4,
					arrivalTime: '10:00 - 10:07 arrival',
					price: 5.0,
					isSelected: false,
				},
				{
					title: 'Ride B',
					passengers: 7,
					arrivalTime: '10:00 - 10:07 arrival',
					price: 7.5,
					isSelected: false,
				},
				{
					title: 'Ride C',
					passengers: 6,
					arrivalTime: '12:00 - 13:30 arrival',
					price: 3.5,
					isSelected: false,
				},
			],
		};
		this.animation = React.createRef();
	}

	componentDidMount() {
		let { lat, lng } = this.props.route.params.source.geometry.location;
		this.setState({
			source: {
				...this.state.source,
				latitude: lat,
				longitude: lng,
			},
		});
	}

	validateConfirmation = async () => {
		const { user } = this.context;
		console.log('Selection', Object.values(this.state.selection));
		if (Object.values(this.state.selection).some(x => x === '')) {
			Alert.alert(
				'No selection made!',
				'Please select your dash ride before continuing :)'
			);
		} else {
			try {
				let request = await createDashRequest(user.uid, {
					...this.props.route.params,
					...this.state.selection,
				});
				this.props.setRideStatus(request.key);
				const dbRef = firebase.database().ref(`trips`);
				let reqChanges = [];
				setTimeout(
					() =>
						dbRef.child(request.key).on(
							'child_changed',
							async snap => {
								// driverKey and tripAccepted keys will arrive one after the other
								// both need to be stored in the same place - array
								reqChanges.push(snap.val());
								//check if values for driverKey and isAccepted have changed
								if (reqChanges.length === 2) {
									let driverInfo = await getDriverInfo(reqChanges[0]);
									//turn off db listener
									dbRef.off('child_changed');
									await this.props.createPickup({
										...pickupSchema,
										...driverInfo,
										driverKey: reqChanges[0]
									})
									this.props.navigation.navigate('NewRide');
								}
							},
							err => console.error(err)
						),
					500
				);
				this.setState({ findingDriver: true });
			} catch (err) {
				Alert.alert('An error occurred', err.message);
			}
		}
	}

	toggleOption = INDEX => {
		let updatedRideOptions = this.state.rideOptions
			.slice()
			.map((item, index) => {
				if (INDEX === index) {
					item['isSelected'] = true;
					let { isSelected, ...selection } = item;
					this.setState({ selection });
				} else {
					item['isSelected'] = false;
				}
				return item;
			});
		this.setState({ rideOptions: updatedRideOptions });
	};

	render() {
		const { source } = this.state;
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
						longitudeDelta: 0.0421,
					}}
					region={source}
				>
					<Marker coordinate={{ latitude: source.latitude, longitude: source.longitude }}/>
				</MapView>
				{this.state.findingDriver ? (
					<Block
						style={{
							flex: 0.55,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<LottieView
							ref={animation => (this.animation = animation)}
							source={require('../../../assets/animations/Bodymovin-rocket.json')}
							autoPlay
							loop
							style={{ width: 300, height: 300 }}
							enableMergePathsAndroidForKitKatAndAbove
						/>
						<Text style={styles.successText} size={18}>
							{"hang on. \nwe're finding you a driver"}
						</Text>
					</Block>
				) : (
					<View style={{ flex: 0.55, alignItems: 'center' }}>
						<Block style={styles.menuContainer}>
							<Text style={styles.header}>Time To Pick A Dash!</Text>
							<FlatList
								contentContainerStyle={{ flexGrow: 1 }}
								scrollEnabled={true}
								keyExtractor={(item, index) => String(index)}
								data={this.state.rideOptions}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity
											activeOpacity={0.9}
											style={[styles.dashRideBox, item.isSelected && styles.btnSelected]}
											onPress={() => this.toggleOption(index)}
										>
											<SvgCarIcon
												color={item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY}
											/>
											<Block style={{ paddingRight: 25 }}>
												<Text
													size={18}
													color={
														item.isSelected ? Theme.COLOURS.WHITE : Theme.COLOURS.SECONDARY
													}
												>
													{item.title}&nbsp;
													<Text small style={item.isSelected && styles.textSelected}>
														{item.passengers}
													</Text>
												</Text>
												<Text
													size={14}
													style={item.isSelected ? styles.textSelected : styles.subText}
												>
													{item.arrivalTime}
												</Text>
											</Block>
											<NumberFormat
												displayType='text'
												value={Number(item.price)}
												prefix='£'
												decimalScale={2}
												fixedDecimalScale
												renderText={text => (
													<Text
														color={
															item.isSelected
																? Theme.COLOURS.WHITE
																: Theme.COLOURS.SECONDARY
														}
														size={24}
													>
														{text}
													</Text>
												)}
											/>
										</TouchableOpacity>
									);
								}}
							/>
						</Block>
						<Block style={styles.paymentContainer}>
							<Block
								style={{
									flex: 0.4,
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<Block style={styles.card}>
									<DashIcons name={'visa'} size={40} />
									<Text size={14} color={Theme.COLOURS.SUB_TEXT} bold>
										VISA ***** 4700
									</Text>
									<TouchableOpacity
										style={{
											flex: 1,
											alignItems: 'center',
										}}
										onPress={() => console.log('Card drop down opened...')}
									>
										<DashIcons name={'dropdown-arrow'} size={14} color={'grey'} />
									</TouchableOpacity>
								</Block>
								<Button style={styles.recent}>
									<DashIcons name={'clock'} size={22} />
								</Button>
							</Block>
							<Button style={styles.confirmBtn} color={'#F2F2F2'} onPress={this.validateConfirmation}>
								<Text size={24} color={Theme.COLOURS.SECONDARY}>
									Confirm your dash
								</Text>
							</Button>
						</Block>
					</View>
				)}
			</View>
		);
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	createPickup: (data) => dispatch(createPickupInfo(data)),
	setRideStatus: (id) => dispatch({type: RIDE_STATUS.ON_SEARCH, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
