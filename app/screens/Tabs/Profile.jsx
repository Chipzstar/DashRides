import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import Theme from '../../constants/Theme';
import Card from '../../components/Card';
import oscar from '../../assets/images/oscar.jpg';
import Emojis from '../../components/Emojis';
import MenuItem from '../../components/MenuItem';

const NAV_OPTIONS = [
	{
		icon: 'wallet',
		title: 'Payment',
		screen: 'PaymentMethods',
	},
	{
		icon: 'history',
		title: 'Rides History',
		screen: 'RidesHistory',
	},
	{
		icon: 'lock',
		title: 'Privacy',
		screen: 'Privacy',
	},
	{
		icon: 'bolt',
		title: 'Dash Streak',
		screen: 'DashStreak',
	},
	{
		icon: 'cog-wheel',
		title: 'Settings',
		screen: 'Settings',
	},
];

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Block style={styles.wrapper}>
					<Card>
						<Block style={styles.mainContent}>
							<Block style={styles.avatarContainer}>
								<Image source={oscar} style={styles.cardAvatar} />
							</Block>
							<Block style={styles.detailsContainer}>
								<Text style={styles.text}>Oscar Sanz</Text>
								<Text style={styles.text}>Snazzy Snaz</Text>
								<Text style={styles.text}>
									4.56&nbsp;&nbsp;
									<Emojis name={'fist-pump'} color={'yellow'} size={20} />
								</Text>
								<Text style={styles.text}>650 RIDES</Text>
							</Block>
						</Block>
						<Block style={styles.btnContainer}>
							<Button style={styles.friendBtn}>
								<Text style={styles.text} bold>
									Add Friends
								</Text>
							</Button>
						</Block>
					</Card>
				</Block>
				<FlatList
					style={{flex: 0.55}}
					contentContainerStyle={{
						flexGrow: 1,
						width: '100%'
					}}
					scrollEnabled={true}
					keyExtractor={(item, index) => String(index)}
					data={NAV_OPTIONS}
					renderItem={({ item }) => <MenuItem icon={item.icon} title={item.title} screen={item.screen} />}
				/>
			</View>
		);
	}
}

const AVATAR_SIZE = 100;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	wrapper: {
		flex: 0.45,
		paddingTop: 50,
		paddingBottom: 25,
		alignItems: 'center',
		backgroundColor: Theme.COLOURS.WHITE,
	},
	text: {
		color: Theme.COLOURS.WHITE,
		fontFamily: 'Lato-Bold',
		fontSize: 25,
		textAlign: 'center',
	},
	profileCard: {
		flex: 0.5,
		width: '95%',
		alignItems: 'center',
		backgroundColor: Theme.COLOURS.PRIMARY,
	},
	mainContent: {
		flex: 0.7,
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnContainer: {
		flex: 0.3,
		width: '100%',
		alignItems: 'center',
	},
	avatarContainer: {
		flex: 0.4,
		alignItems: 'center',
	},
	detailsContainer: {
		flex: 0.6,
		alignItems: 'center',
	},
	cardAvatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE,
	},
	friendBtn: {
		flex: 1,
		backgroundColor: Theme.COLOURS.LINK,
		borderRadius: 10,
		width: '75%',
	},
});
