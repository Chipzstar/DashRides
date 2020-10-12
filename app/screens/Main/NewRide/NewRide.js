import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles, { WIDTH } from './styles';
import { Block, Input, Text } from 'galio-framework';
import * as PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import AuthContext from '../../../navigation/context';
//assets
import dash_car from '../../../assets/images/dash_car.png';
import oscar from '../../../assets/images/oscar.jpg';
import btnCall from '../../../assets/images/btn_call.png';
import Theme from '../../../constants/Theme';
import Emojis from '../../../components/Emojis';
import DashIcons from '../../../components/DashIcons';
//helpers
import edgePadding from '../../../helpers/edgePadding';
import UserPermissions from '../../../permissions/UserPermissions';
import { createPickupInfo, updatePickupInfo } from '../../../store/actions/pickupAction';
//firebase
import firebase from 'firebase/app';
import 'firebase/database';
import { getDriverCoordinates, getDriverInfo } from '../../../config/Fire';
import { pickupSchema } from '../../../constants/Schemas';

class NewRide extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			driverCoords: {
				lat: 0,
				lng: 0,
			},
			markers: [],
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
		this.mapView = React.createRef();
		this.animation = React.createRef();
	}

	async componentDidMount() {
		await UserPermissions.getLocationPermission();
		const { uid } = this.context.user;
		let { tripId } = this.props.rideStatus;
		let {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.BestForNavigation,
			enableHighAccuracy: true,
			maximumAge: 2000,
			timeout: 20000,
		});

		//TODO
		await firebase
			.database()
			.ref(`trips/${tripId}`)
			.on(
				'value',
				async snapshot => {
					console.log('Snapshot:', snapshot.val());
					//check if the trip is still accepted
					if (snapshot.val().driverKey && snapshot.val().tripAccepted) {
						const { driverKey, arrivalTime } = snapshot.val();
						//compare local pickup state with database snapshot
						if (this.props.pickUp.driverKey === undefined) {
							let driverInfo = await getDriverInfo(driverKey);
							this.props.createPickupInfo({
								...pickupSchema,
								...driverInfo,
								driverKey,
								arrivalTime
							});
						}
						let [lat, lng] = await getDriverCoordinates(uid, driverKey);
						this.setState(
							{
								markers: [{ id: 'driver', latitude: lat, longitude: lng }],
								driverCoords: { lat, lng },
								latitude,
								longitude
							},
							() => this.props.updatePickupInfo({arrivalTime})
						);
					}
				},
				err => console.error(err)
			);
	}

	componentWillUnmount() {
		clearInterval(this.updateTrip);
	}

	updateTrip = setInterval(async () => {
		const { latitude, longitude, driverCoords } = this.state;
		const { uid } = this.context.user;
		const { driverKey } = this.props.pickUp;
		if (driverKey) {
			let [lat, lng] = await getDriverCoordinates(uid, driverKey);
			this.setState(
				{
					driverCoords: { lat, lng },
					markers: [{ id: 'driver', latitude: lat, longitude: lng }],
				},
				() =>
					this.mapView.fitToCoordinates(
						[
							{ latitude, longitude },
							{ latitude: driverCoords.lat, longitude: driverCoords.lng },
						],
						{
							edgePadding,
						}
					)
			);
		}
	}, 20 * 1000);

	render() {
		const AVATAR_SIZE = 100;
		let { latitude, longitude, latitudeDelta, longitudeDelta, markers, driverCoords } = this.state;
		let { car, driverName, reg, arrivalTime } = this.props.pickUp;
		return arrivalTime && markers.length ? (
			<View style={styles.container}>
				<StatusBar hidden />
				<MapView
					ref={ref => (this.mapView = ref)}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					showsCompass={true}
					showsUserLocation={true}
					followsUserLocation={true}
					region={{
						latitude,
						longitude,
						latitudeDelta,
						longitudeDelta,
					}}
				>
					{markers.map(({ id, latitude, longitude }, index) => (
						<Marker key={index} coordinate={{ latitude, longitude }} identifier={id}>
							{index === 0 && <Image source={Theme.IMAGES.carTop} style={{ width: 25, height: 50 }} />}
						</Marker>
					))}
					<MapViewDirections
						apikey={process.env.GOOGLE_DIRECTIONS_API_KEY}
						origin={{ latitude: driverCoords.lat, longitude: driverCoords.lng }}
						destination={{ latitude, longitude }}
						strokeWidth={5}
						strokeColor={Theme.COLOURS.PRIMARY}
						onStart={params => {
							console.log(`Started Route between ${params.origin} and ${params.destination}`);
						}}
						onReady={result => {
							console.log(`Distance: ${result.distance} km`);
							console.log(`Duration: ${result.duration} min.`);
							this.mapView.fitToCoordinates(result.coordinates, {
								edgePadding,
							});
						}}
						onError={err => console.error(err)}
					/>
				</MapView>
				<TouchableOpacity activeOpacity={0.7} style={styles.backBtn} onPress={this.props.navigation.goBack}>
					<DashIcons name='back' size={28} color={'#4B545A'} />
				</TouchableOpacity>
				<Block style={styles.infoContainer}>
					<Block style={styles.details}>
						<Block
							style={{
								flex: 0.45,
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}
						>
							<Block style={styles.avatar}>
								<Image
									source={oscar}
									style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE }}
								/>
							</Block>
							<Text style={styles.subHeader}>
								<Text style={{ textDecorationLine: 'underline' }} bold>
									{driverName}&nbsp;
								</Text>
								is on his way!
							</Text>
							<Block
								style={{
									flexDirection: 'row',
									paddingTop: 10,
									paddingBottom: 5,
								}}
							>
								<Emojis name={'fist-pump'} color={'orange'} />
							</Block>
							<Text style={styles.subText}>1 rating</Text>
						</Block>
						<Block
							style={{
								flex: 0.55,
								flexDirection: 'column',
								justifyContent: 'flex-start',
							}}
						>
							<Block
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Block style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
									<Image source={dash_car} style={{ width: WIDTH * 0.2, height: 50 }} />
									<Text style={styles.subText}>{`${car}\n${reg}`}</Text>
								</Block>
								<Block style={{ flex: 1 }}>
									<Text style={styles.subText}>
										<Text size={24}>{'631\n'}</Text>total rides
									</Text>
								</Block>
							</Block>
							<Block style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={styles.arrivalText}>{arrivalTime}</Text>
							</Block>
						</Block>
					</Block>
					<Block
						style={{
							flex: 0.35,
							width: WIDTH,
							elevation: 5,
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Input
							bgColor={Theme.COLOURS.MSG_FIELD}
							style={styles.msgInput}
							placeholder={`send ${driverName} a message...`}
						/>
						<TouchableOpacity activeOpacity={0.5} style={styles.callBtn}>
							<Image source={btnCall} style={styles.callIcon} />
						</TouchableOpacity>
					</Block>
				</Block>
			</View>
		) : (
			<View style={[styles.container, { justifyContent: 'center' }]}>
				<LottieView
					ref={animation => (this.animation = animation)}
					source={require('../../../assets/animations/Bodymovin-rocket.json')}
					autoPlay
					loop
					style={{ width: 300, height: 350 }}
					enableMergePathsAndroidForKitKatAndAbove
				/>
			</View>
		);
	}
}

NewRide.propTypes = {
	route: PropTypes.any,
	navigation: PropTypes.any,
};

const mapStateToProps = state => {
	console.log('State:', state);
	return {
		pickUp: state.pickUp,
		rideStatus: state.rideStatus,
	};
};

export default connect(mapStateToProps, { createPickupInfo, updatePickupInfo })(NewRide);
