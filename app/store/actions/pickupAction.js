import { CREATE_PICKUP, UPDATE_PICKUP, REMOVE_PICKUP } from '../actionTypes';

export const createPickupInfo = data => ({
	type: CREATE_PICKUP,
	data,
});

export const updatePickupInfo = data => ({
	type: UPDATE_PICKUP,
	data,
});

export const removePickupInfo = id => ({
	type: REMOVE_PICKUP,
	id,
});
