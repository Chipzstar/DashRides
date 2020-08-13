import React, { useEffect, useMemo, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Auth/LoginScreen/Login";
import Register from "../screens/Auth/SignUpScreen/Register";
import Loading from "../startup/Loading";
import Onboarding from "../screens/Onboarding/Onboarding";
import Main from "../screens/Main/Main";
import ChooseRide from "../screens/Main/ChooseRide";
import Profile from "../screens/Main/Profile";
import { AuthProvider } from "./context";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { Alert } from "react-native";
import { usersSchema } from "../constants/DatabaseSchemas";
import { uploadPhotoAsync } from "../config/Fire";
import DashIcons from "../components/DashIcons";
import Socials from "../screens/Main/Socials";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator headerMode={"none"}>
		{userToken ? (
			<RootStack.Screen name={"App"} component={HomeTabScreen}/>
		) : (
			<RootStack.Screen name={"Auth"} component={AuthStackScreen}/>
		)}
	</RootStack.Navigator>
);

const AuthStackScreen = () => (
	<AuthStack.Navigator headerMode={"none"}>
		<AuthStack.Screen name={"Onboarding"} component={Onboarding}/>
		<AuthStack.Screen name={"SignIn"} component={Login}/>
		<AuthStack.Screen name={"SignUp"} component={Register}/>
	</AuthStack.Navigator>
);

const MainStackScreen = () => (
	<MainStack.Navigator headerMode={"none"}>
		<MainStack.Screen name={"Home"} component={Main}/>
		<MainStack.Screen name={"ChooseRide"} component={ChooseRide}/>
		<MainStack.Screen name={"Profile"} component={Profile}/>
	</MainStack.Navigator>
);

const HomeTabScreen = () => (
	<Tab.Navigator
		initialRouteName={"Home"}
		headerMode={"none"}
		screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => {
				let iconName;
				route.name === "Home" ?
					iconName = "location" :
					route.name === "Profile" ?
						iconName = "user" :
						iconName = "chat";
				return <DashIcons name={iconName} size={size} color={color}/>;
			}
		})}>
		<Tab.Screen name={"Social"} component={Socials}/>
		<Tab.Screen name={"Home"} component={Main}/>
		<Tab.Screen name={"Profile"} component={Profile}/>
	</Tab.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState();

	const authContext = useMemo(() => {
		return {
			signIn: ({ email, password }) => {
				firebase.auth().signInWithEmailAndPassword(email.toLowerCase().trim(), password)
					.then(({ user }) => {
						setIsLoading(false);
						setUserToken(user.uid);
					})
					.catch(error => {
						switch (error.code) {
							case "auth/invalid-email":
								Alert.alert("That email address is invalid");
								return;
							case "auth/user-disabled":
								Alert.alert("The account with that email address has been disabled");
								return;
							case "auth/wrong-password":
								Alert.alert("Wrong password");
								return;
							case "auth/user-not-found":
								Alert.alert("No user exists with that email address");
								return;
							default:
								console.error(error);
						}
					});
			},
			signUp: async (inputs) => {
				try {
					const { user } = await firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password1);
					console.log("AuthID:", user.uid);
					//upload user profile to firebase storage
					const path = `user/${user.uid}/image/jpg`;
					if (inputs.avatar) {
						const { downloadURL } = await uploadPhotoAsync(inputs.avatar, path);
						console.log("image uploaded!");
						inputs.avatar = downloadURL;
					}
					//put details into database
					await firebase.database()
						.ref()
						.child("users")
						.child(user.uid)
						.set({
							...usersSchema,
							firstname: inputs.firstName,
							surname: inputs.lastName,
							tel: inputs.tel,
							profilePicURL: inputs.avatar,
							provider: "Firebase"
						});
					console.log("User added to database");
					/*firebase.database()
						.ref(`users/${res.user.uid}`)
						.once("value")
						.then(snapshot => console.log(snapshot))
						.catch(err => console.err(err));*/
					await user.updateProfile({
						displayName: inputs.username
					});
					setIsLoading(false);
					setUserToken(user.uid);
					console.log("User account created & signed in!");
				} catch (err) {
					if (err.code !== undefined) {
						if (err.code === "auth/email-already-in-use") {
							Alert.alert("That email address is already in use!");
						}
						if (err.code === "auth/invalid-email") {
							Alert.alert("That email address is invalid!");
						}
					}
					console.error(err);
				}
			},
			signOut: () => {
				firebase.auth().signOut()
					.then(function() {
						setIsLoading(false);
						setUserToken(null);
					}).catch(function(error) {
					console.error(error);
				});
			},
			user: () => {
				if (userToken) return firebase.auth().currentUser;
				return userToken;
			}
		};
	}, []);

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUserToken(user);
		console.log(user);
		if (isLoading) setIsLoading(false);
	}

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(onAuthStateChanged);
		/*setTimeout(() => {
			setIsLoading(!isLoading);
		}, 1000);*/
	}, []);

	return (
		<AuthProvider value={authContext}>
			{isLoading ?
				<Loading/> :
				<RootStackScreen userToken={userToken}/>
			}
		</AuthProvider>
	);
};

export default AppNavigator;
