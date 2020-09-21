import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, AsyncStorage } from 'react-native';
//firebase
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//schemas
import { AuthProvider } from './context';
import { usersSchema } from '../constants/Schemas';
//Screens
import Login from '../screens/Auth/LoginScreen/Login';
import Register from '../screens/Auth/SignUpScreen/Register';
import ForgotPassword from '../screens/Auth/ForgotPasswordScreen/ForgotPassword';
import Loading from '../startup/Loading';
import Main from '../screens/Main/Home/Main';
import SearchRide from '../screens/Main/SearchRide/SearchRide';
import Profile from '../screens/Tabs/Profile';
import IntroSlider from '../startup/IntroSlider';
import Socials from '../screens/Tabs/Socials';
import Onboarding from '../screens/Onboarding/Onboarding';
import RiderPreferences from '../screens/Main/RiderPreferences/RiderPreferences';
import MakePayment from '../screens/Main/MakePayment/MakePayment';
import NewRide from '../screens/Main/NewRide/NewRide';
//components
import DashIcons from '../components/DashIcons';
import TabBar from '../components/TabBar';
//functions
import { clearWelcomeStatus } from '../store/AsyncStorage';
import getTabBarVisibility from '../helpers/handleTabBarVisibility';
//styles
import styles from '../startup/styles';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStackScreen = ({ userToken, showApp, authRoute, onAuth }) => (
	<RootStack.Navigator headerMode={'none'}>
		{userToken ? (
			<RootStack.Screen name={'App'} component={HomeTabScreen} />
		) : showApp ? (
			<RootStack.Screen name={'Auth'}>
				{props => <AuthStackScreen onAuth={onAuth} routeName={authRoute} />}
			</RootStack.Screen>
		) : (
			<RootStack.Screen name={'Welcome'}>{props => <IntroSlider onAuth={onAuth} />}</RootStack.Screen>
		)}
	</RootStack.Navigator>
);

const AuthStackScreen = ({ routeName, onAuth }) => {
	console.log('ROUTE NAME', routeName);
	return routeName ? (
		<AuthStack.Navigator headerMode={'none'} initialRouteName={routeName}>
			<AuthStack.Screen name={'SignIn'} component={Login} />
			<AuthStack.Screen name={'SignUp'} component={Register} />
			<AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
			<AuthStack.Screen name={'Onboarding'}>
				{props => <Onboarding height={200} width={200} styles={styles} onAuth={onAuth} />}
			</AuthStack.Screen>
		</AuthStack.Navigator>
	) : (
		<AuthStack.Navigator headerMode={'none'} initialRoute={'Onboarding'}>
			<AuthStack.Screen name={'Onboarding'}>
				{props => <Onboarding height={200} width={200} styles={styles} />}
			</AuthStack.Screen>
			<AuthStack.Screen name={'SignIn'} component={Login} />
			<AuthStack.Screen name={'SignUp'} component={Register} />
			<AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
		</AuthStack.Navigator>
	);
};

const MainStackScreen = () => (
	<MainStack.Navigator headerMode={'none'} initialRouteName={'Main'}>
		<MainStack.Screen name={'Home'} component={Main} />
		<MainStack.Screen name={'SearchRide'} component={SearchRide} />
		<MainStack.Screen name={'Preferences'} component={RiderPreferences} />
		<MainStack.Screen name={'Payment'} component={MakePayment} />
		<MainStack.Screen name={'NewRide'} component={NewRide} />
	</MainStack.Navigator>
);

const HomeTabScreen = () => (
	<Tab.Navigator
		initialRouteName={'Main'}
		headerMode={'none'}
		screenOptions={({ route }) => ({
			tabBarVisible: getTabBarVisibility(route),
			tabBarIcon: ({ color }) => {
				let iconName;
				route.name === 'Main'
					? (iconName = 'location')
					: route.name === 'Profile'
					? (iconName = 'user')
					: (iconName = 'chat');
				return <DashIcons name={iconName} size={40} color={color} />;
			},
		})}
		tabBar={props => <TabBar {...props} />}
		tabBarOptions={{
			showLabel: false,
			style: { height: 70 },
		}}
	>
		<Tab.Screen name={'Social'} component={Socials} />
		<Tab.Screen name={'Main'} component={MainStackScreen} />
		<Tab.Screen name={'Profile'} component={Profile} />
	</Tab.Navigator>
);

let unsubscribeAuth;

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);
	const [showApp, setShowApp] = useState(false);
	const [authRoute, setAuthRoute] = useState();

	const authContext = useMemo(
		() => ({
			signIn: ({ email, password }) => {
				unsubscribeAuth();
				firebaseApp
					.auth()
					.signInWithEmailAndPassword(email.toLowerCase().trim(), password)
					.then(({ user }) => {
						setIsLoading(false);
						setUserToken(user.uid);
					})
					.catch(error => {
						switch (error.code) {
							case 'auth/invalid-email':
								Alert.alert('That email address is invalid');
								return;
							case 'auth/user-disabled':
								Alert.alert('The account with that email address has been disabled');
								return;
							case 'auth/wrong-password':
								Alert.alert('Wrong password');
								return;
							case 'auth/user-not-found':
								Alert.alert('No user exists with that email address');
								return;
							default:
								Alert.alert('Oops!', error.message);
								console.log(error);
						}
					});
			},
			signUp: inputs => {
				console.log('Sign up function entered...', inputs);
				try {
					unsubscribeAuth();
					firebaseApp
						.auth()
						.createUserWithEmailAndPassword(inputs.email, inputs.password)
						.then(({ user }) => {
							console.log('AuthID:', user.uid);
							//put details into database
							firebaseApp
								.database()
								.ref()
								.child('users')
								.child(user.uid)
								.set({
									...usersSchema,
									username: inputs.username,
									firstname: inputs.firstName,
									surname: inputs.lastName,
									tel: inputs.tel,
									profilePicURL: inputs.avatar,
								})
								.then(() => {
									console.log('User added to database');
									user.updateProfile({
										displayName: inputs.username,
									}).then(() => {
										console.log('Display name updated');
										//change state of for loading screen to be false
										setIsLoading(false);
										//sets the auth uid as the userToken's value
										setUserToken(user.uid);
										console.log('User account created & signed in!');
									});
								});
						});
				} catch (err) {
					if (err.code !== undefined) {
						if (err.code === 'auth/email-already-in-use') {
							Alert.alert('User email taken!', err.message);
						}
						if (err.code === 'auth/invalid-email') {
							Alert.alert('That email address is invalid!');
						}
					} else {
						console.error(err)
					}
				}
			},
			signOut: () => {
				firebaseApp
					.auth()
					.signOut()
					.then(function () {
						console.log('signed out');
						setIsLoading(false);
						setUserToken(null);
					})
					.catch(function (error) {
						console.error(error);
					});
			},
			user: userToken ? firebaseApp.auth().currentUser : userToken,
		}),
		[userToken]
	);

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUserToken(user);
		console.log('onAuthStateChanged');
		if (isLoading) setIsLoading(false);
	}

	async function checkWelcomeStatus() {
		console.log(showApp, userToken);
		let value = await AsyncStorage.getItem('SHOW_APP');
		console.log('Ready to show app:', !!value);
		setShowApp(!!value);
	}

	useEffect(() => {
		checkWelcomeStatus();
		/*const unsubscribeMessaging = firebase.messaging().onMessage(async remoteMessage => {
			console.log(remoteMessage)
			/!*Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));*!/
		});*/
		unsubscribeAuth = firebaseApp.auth().onAuthStateChanged(onAuthStateChanged);
		return () => {
			unsubscribeAuth();
			//unsubscribeMessaging()
		}
	}, []);

	async function onAuth(routeName) {
		await clearWelcomeStatus();
		setAuthRoute(routeName);
		setShowApp(true);
	}

	return (
		<AuthProvider value={authContext}>
			{isLoading ? (
				<Loading />
			) : (
				<RootStackScreen userToken={userToken} showApp={showApp} authRoute={authRoute} onAuth={onAuth} />
			)}
		</AuthProvider>
	);
};

export default AppNavigator;
