import { combineReducers } from 'redux';
import pickupReducer from './pickupReducer';
import dropoffReducer from './dropoffReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { RESET, CLEAR, INTRO_COMPLETE, RIDE_STATUS } from '../actionTypes';

export const CLEAR_WELCOME_STATE = ({
	type: INTRO_COMPLETE
})

export const CLEAR_RIDE_STATUS = ({
	type: CLEAR
})

const appReducer = combineReducers({
	firstTime: (state=false, action) => {
		switch (action.type){
			case(INTRO_COMPLETE):
				return true;
			default:
				return state;
		}
	},
	rideStatus: (state=null, action) => {
		switch (action.type){
			case(RIDE_STATUS.ON_SEARCH):
				return {key: 1, tripId: action.id}
			case(RIDE_STATUS.ON_PICKUP):
				return {key: 2, tripId: action.id}
			case(RIDE_STATUS.ON_DROPOFF):
				return {key: 3, tripId: action.id}
			case(RIDE_STATUS.ON_COMPLETE):
				return {key: 4, tripId: action.id}
			case(CLEAR):
				return null;
			default:
				return state
		}
	},
	pickUp: pickupReducer,
	dropOff: dropoffReducer
});

const rootReducer = (state, action) => {
	if (action.type === RESET) {
		console.log("Redux Storage has been reset");
		AsyncStorage.remove("persist:root")
		state = undefined
	}
	return appReducer(state, action);
}

export default rootReducer;
