import React, { useState, useEffect, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/LoginScreen/Login";
import Register from "../screens/Auth/SignUpScreen/Register";
import Loading from "../startup/Loading";
import Onboarding from "../screens/Onboarding/Onboarding";
import Main from "../screens/Main/Main";
import ChooseRide from "../screens/Main/ChooseRide";
import Profile from "../screens/Main/Profile";
import AuthContext, { AuthProvider } from "./context";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator headerMode={"none"}>
		<RootStack.Screen name={"Auth"} component={AuthStackScreen}/>
		<RootStack.Screen name={"App"} component={MainStackScreen}/>
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
		<MainStack.Screen name={"Dashboard"} component={Main}/>
		<MainStack.Screen name={"ChooseRide"} component={ChooseRide}/>
		<MainStack.Screen name={"Profile"} component={Profile}/>
	</MainStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);

	const authContext = useMemo(() => {
		return {
			signIn: () => {
				setIsLoading(false);
				setUserToken("asddf");
			},
			signUp: () => {
				setIsLoading(false);
				setUserToken("asddf");
			},
			signOut: () => {
				setIsLoading(false);
				setUserToken(null);
			}
		};
	});

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(!isLoading);
		}, 1000);
	}, []);

	return (
		<AuthProvider value={authContext}>
			{isLoading ?
				<Loading/> :
				userToken ?
					<MainStackScreen/> :
					<AuthStackScreen/>
			}
		</AuthProvider>
	);
};

export default AppNavigator;
