import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

//import redux
import rootReducer from './reducers';
import { createLogger } from 'redux-logger/src';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['firstTime', 'pickUp', 'rideStatus'],
	blacklist: ['dropOff']
}

//Middleware: Redux Persist persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Redux store
const store = createStore(
	persistedReducer,
	applyMiddleware(
		thunkMiddleware,
		createLogger(),
	)
);

let persistor = persistStore(store);

export { store, persistor };
