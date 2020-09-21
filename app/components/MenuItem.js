import React from 'react';
import { View } from 'react-native';
import { Text, Block } from 'galio-framework';
import PropTypes from 'prop-types';
import Theme from '../constants/Theme';
import { SimpleLineIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DashIcons from './DashIcons';

const renderIcon = iconName =>
	iconName === 'wallet' ? (
		<SimpleLineIcons name={'wallet'} size={24} color={'black'} />
	) : iconName === 'bolt' ? (
		<FontAwesome name={'bolt'} size={24} color={'black'} />
	) : iconName === 'history' ? (
		<MaterialIcons name='history' size={24} color='black' />
	) : iconName === 'lock' ? (
		<Ionicons name='ios-lock' size={24} color='black' />
	) : (
		<DashIcons name={'cog-wheel'} size={24} color={'black'} />
	);

const MenuItem = ({ icon, title, screen }) => (
	<View
		style={{
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: Theme.COLOURS.WHITE,
			paddingHorizontal: 20,
			paddingVertical: 20,
			marginVertical: 10,
		}}
	>
		<Block style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
			{renderIcon(icon)}
			<Text style={{ fontSize: 20, paddingLeft: 20, fontFamily: 'Lato-Regular' }}>{title}</Text>
		</Block>
		<DashIcons name={'goto'} size={24} color={Theme.COLOURS.SECONDARY} />
	</View>
);

MenuItem.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	screen: PropTypes.string.isRequired,
};

export default MenuItem;
