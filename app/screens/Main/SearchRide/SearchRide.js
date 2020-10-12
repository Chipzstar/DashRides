import React, { useEffect, useState } from 'react';
import { Block, Button, Text } from 'galio-framework';
import * as Location from 'expo-location';
import {
	Keyboard,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Alert,
	SafeAreaView,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Theme from '../../../constants/Theme';
import DashIcons from '../../../components/DashIcons';
import PlacesInput from 'react-native-places-input';
import { Ionicons } from '@expo/vector-icons';
import SvgNavIcon from '../../../components/SvgNavIcon';
//styles
import styles from './styles';

console.disableYellowBox = true;

const homePlace = {
	description: 'Home',
	geometry: { location: { latitude: 48.8152937, longitude: 2.4597668 } },
};

const workPlace = {
	description: 'Work',
	geometry: { location: { latitude: 48.8496818, longitude: 2.2940881 } },
};

const reverseGeocodeAsync = async ({ lat, long }) => {
	const addrKeys = ['name', 'street', 'city', 'region', 'postalCode'];
	let addressString = '';
	try {
		let addressObj = (
			await Location.reverseGeocodeAsync({
				latitude: lat,
				longitude: long,
			})
		)[0];
		console.log(addressObj);
		for (let key of addrKeys) {
			addressObj[key] !== null ? (addressString = addressString.concat(String(addressObj[key]), ', ')) : null;
		}
		return addressString.slice(0, -2);
	} catch (e) {
		console.error(e);
	}
};

const SearchRide = ({ route, navigation }) => {
	const [source, setSource] = useState('');
	const [dest, setDestination] = useState('');
	const [address, setAddress] = useState('');
	const [hasInput, setHasInput] = useState(false);
	const validateLocations = () => {
		if (source && dest) {
			navigation.navigate('Preferences', { source, dest });
		} else {
			Alert.alert(
				'Missing Location field!',
				'Please make sure ' + 'you have entered a location in both fields before' + ' continuing ',
				[
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			);
		}
	};
	useEffect(() => {
		Geocoder.init(process.env.GOOGLE_GEOCODING_API_KEY, { language: 'en' });
		reverseGeocodeAsync(route.params).then(res => setAddress(res));
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => navigation.pop()}
						style={{
							margin: 20,
							width: 25,
						}}
					>
						<DashIcons name={'back'} color={'#4B545A'} size={28} />
					</TouchableOpacity>
					<Block flex center>
						<Block style={styles.locationContainer}>
							<Block
								flex
								center
								style={{
									flex: 0.2,
								}}
							>
								<SvgNavIcon />
							</Block>
							<Block flex center>
								<Text muted style={{ alignSelf: 'flex-start', left: 10 }}>
									start
								</Text>
								<PlacesInput
									onChangeText={text => (text ? setHasInput(true) : setSource(''))}
									query={!hasInput && address}
									stylesContainer={{
										position: 'relative',
										alignSelf: 'stretch',
										width: 250,
										marginBottom: 15,
										borderRadius: 10,
										backgroundColor: '#F2F2F2',
									}}
									stylesInput={{
										borderRadius: 10,
										fontFamily: 'Roboto',
										fontSize: 18,
										color: '#4B545A',
									}}
									stylesItemText={{
										fontFamily: 'Roboto',
										color: '#4B545A',
									}}
									placeHolder={'Current Location'}
									language='en-UK'
									googleApiKey={process.env.GOOGLE_PLACES_API_KEY}
									onSelect={place => setSource(place.result)}
									iconResult={<Ionicons name='md-pin' size={25} style={styles.placeIcon} />}
									iconInput={
										<Ionicons
											name='md-close-circle-outline'
											size={30}
											color='black'
											style={styles.closeIcon}
										/>
									}
								/>
								<Text muted style={{ alignSelf: 'flex-start', left: 10 }}>
									end
								</Text>
								<PlacesInput
									onChangeText={text => !text && setDestination('')}
									stylesContainer={{
										position: 'relative',
										alignSelf: 'stretch',
										width: 250,
										marginBottom: 15,
										borderRadius: 10,
										backgroundColor: '#F2F2F2',
									}}
									stylesInput={{
										borderRadius: 10,
										fontFamily: 'Roboto',
										fontSize: 18,
										color: '#4B545A',
									}}
									stylesItemText={{
										fontFamily: 'Roboto',
										color: '#4B545A',
									}}
									language='en-UK'
									googleApiKey={process.env.GOOGLE_PLACES_API_KEY}
									onSelect={place => setDestination(place.result)}
									iconResult={<Ionicons name='md-pin' size={25} style={styles.placeIcon} />}
									iconInput={
										<Ionicons name='md-close' size={25} color='black' style={styles.closeIcon} />
									}
								/>
							</Block>
						</Block>
						<Block flex style={{ justifyContent: 'flex-start', paddingTop: 50 }}>
							<Button
								style={styles.nextBtn}
								color={source && dest ? Theme.COLOURS.BUTTON : Theme.COLOURS.DISABLED}
								onPress={validateLocations}
							>
								<Text bold size={20} color={Theme.COLOURS.WHITE}>
									Next
								</Text>
							</Button>
						</Block>
					</Block>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default SearchRide;
