import React, { useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import AuthContext from '../../navigation/context';
import { Block, Button, Text } from 'galio-framework';
import Theme from '../../constants/Theme';
import * as Notifications from 'expo-notifications';

async function getInstanceIdToken(){
	const token = (await Notifications.getDevicePushTokenAsync()).data;
	Alert.alert("Device token", token)
	console.log(token)
}

const Socials = props => {
	const { signOut } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<Text style={styles.text}> Welcome to the Socials Screen </Text>
			<Block style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
				<Button color={Theme.COLOURS.LINK} style={{ flex: 0.5, alignSelf: 'center' }} onPress={getInstanceIdToken}>
					<Text color={Theme.COLOURS.WHITE} bold size={18}>
						Get Device Token
					</Text>
				</Button>
				<Button
					color={Theme.COLOURS.DISABLED}
					style={{ flex: 0.5, alignSelf: 'center' }}
					onPress={() => signOut()}
				>
					<Text color={Theme.COLOURS.WHITE} bold size={18}>
						Sign Out
					</Text>
				</Button>
			</Block>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
	},
});

export default Socials;
