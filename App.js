import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-console-time-polyfill';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store/store';

let customFonts = {
	"Arciform": require("./app/assets/fonts/arciformff/Arciform.otf"),
	"Lato-Regular": require("./app/assets/fonts/lato/Lato-Regular.ttf"),
	"Lato-Bold": require("./app/assets/fonts/lato/Lato-Bold.ttf"),
	"Lato-Italic": require("./app/assets/fonts/lato/Lato-Italic.ttf"),
	"Lato-Light": require("./app/assets/fonts/lato/Lato-Light.ttf"),
	"Lato-Black": require("./app/assets/fonts/lato/Lato-Black.ttf"),
	"Lato-Thin": require("./app/assets/fonts/lato/Lato-Thin.ttf"),
	"DashIcons": require("./app/assets/icons/general/fonts/icomoon.ttf"),
	"Emojis": require("./app/assets/icons/emojis/fonts/icomoon.ttf")
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			showApp: false
		};
	}

	async componentDidMount() {
		try {
			await SplashScreen.preventAutoHideAsync();
		} catch (e) {
			console.warn(e);
		}
		this.prepareResources().then(() => console.log("All resources have been loaded!"));
	}

	prepareResources = async () => {
		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
		await downloadAssets();
		this.setState({ loading: false }, async () => {
			await SplashScreen.hideAsync();
		});
	};

	render() {
		const { loading } = this.state;
		if (loading) {
			return null;
		}
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider>
						<NavigationContainer>
							<AppNavigator />
						</NavigationContainer>
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
		);
	}
}

async function performAPICalls() {}

async function downloadAssets() {
	await Font.loadAsync(customFonts);
}
