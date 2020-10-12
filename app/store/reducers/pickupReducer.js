import { CREATE_PICKUP, REMOVE_PICKUP, UPDATE_PICKUP } from '../actionTypes';

const initialState = {}

const pickupReducer = (state=initialState, action) => {
	switch(action.type){
		case CREATE_PICKUP:
			return { ...action.data}
		case UPDATE_PICKUP:
			return { ...state, ...action.data };
		case REMOVE_PICKUP:
			return initialState;
		default:
			return state;
	}
}

export default pickupReducer;
