import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Block } from 'galio-framework';
import Theme from '../constants/Theme';

const Card = props => (
	<View style={styles.card}>
		<Block style={styles.cardContent}>
			{props.children}
		</Block>
	</View>
);

const styles = StyleSheet.create({
	card: {
		backgroundColor: Theme.COLOURS.PRIMARY,
		flex: 1,
		width: "95%",
		elevation: 3,
		borderRadius: 10,
		shadowOffset: { width: 1, height: 1},
		shadowRadius: 2,
		shadowOpacity: 0.3,
		shadowColor: 'rgba(0, 0, 0, 0.25)'
	},
	cardContent: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 10
	}
});

export default Card;
