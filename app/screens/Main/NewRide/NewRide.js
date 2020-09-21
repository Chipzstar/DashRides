import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles, { WIDTH } from './styles';
import { Block, Input, Text } from 'galio-framework';
import * as PropTypes from 'prop-types';
//assets
import dash_car from '../../../assets/images/dash_car.png';
import oscar from '../../../assets/images/oscar.jpg';
import btnCall from '../../../assets/images/btn_call.png';
import Theme from '../../../constants/Theme';
import Emojis from '../../../components/Emojis';
import DashIcons from '../../../components/DashIcons';

class NewRide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const AVATAR_SIZE = 100;
		let { route, navigation } = this.props;
		//let { driverName } = route.params;
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
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.backBtn}
					onPress={this.props.navigation.goBack}
				>
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
									Oscar&nbsp;
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
									<Text style={styles.subText}>
										<Text>{'Vauxhall Astra\n'}</Text>7Y8 6YY
									</Text>
								</Block>
								<Block style={{ flex: 1 }}>
									<Text style={styles.subText}>
										<Text size={24}>{'631\n'}</Text>total rides
									</Text>
								</Block>
							</Block>
							<Text style={styles.arrivalText}>10:14 arrival</Text>
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
							placeholder={`send Oscar a message...`}
						/>
						<TouchableOpacity activeOpacity={0.5} style={styles.callBtn}>
							<Image source={btnCall} style={styles.callIcon}/>
						</TouchableOpacity>
					</Block>
				</Block>
			</View>
		);
	}
}

NewRide.propTypes = {
	route: PropTypes.any,
	navigation: PropTypes.any,
};

export default NewRide;
