import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "./constants/styles";
import AppLoading from "expo-app-loading";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import SearchListContextProvider from "./store/searchList-context";
import HomeScreen from "./screens/HomeScreen";
import BoardDetailScreen from "./screens/BoardDetail";
import AlertScreen from "./screens/AlertScreen";
import FollowingScreen from "./screens/FollowingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SchoolScreen from "./screens/SchoolScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WriteBoardScreen from "./screens/WriteBoardScreen";
import SearchBoardScreen from "./screens/SearchBoardScreen";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SignupScreen3 from "./screens/SignupScreen3";
import SignupScreen2 from "./screens/SignupScreen2";
import HomeSearchScreen from "./screens/HomeSearchScreen";
import FollowingSearchScreen from "./screens/FollowingSearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Signup2"
				component={SignupScreen2}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Signup3"
				component={SignupScreen3}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

const HomeStack = () => {
	return (
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: Colors.default },
					headerLeftContainerStyle: { paddingLeft: 15 },
					headerRightContainerStyle: { paddingRight: 15 },
					headerShadowVisible: false,
				}}
			>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerTitle: "" }}
				/>
				<Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
				<Stack.Screen name="SchoolScreen" component={SchoolScreen} />
				<Stack.Screen name="HomeSearchScreen" component={HomeSearchScreen} />
				<Stack.Screen name="SearchBoardScreen" component={SearchBoardScreen} />
			</Stack.Navigator>
	);
};

const FollowingStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.default },
				headerLeftContainerStyle: { paddingLeft: 15 },
				headerRightContainerStyle: { paddingRight: 15 },
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="Following"
				component={FollowingScreen}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen name="FollowingBoardDetail" component={BoardDetailScreen} />

			<Stack.Screen
				name="FollowingSearchScreen"
				component={FollowingSearchScreen}
			/>
		</Stack.Navigator>
	);
};

const WriteBoardStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.default },
				headerLeftContainerStyle: { paddingLeft: 15 },
				headerRightContainerStyle: { paddingRight: 15 },
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="WriteBoard"
				component={WriteBoardScreen}
				options={{ headerTitle: "", headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const ProfileStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.default },
				headerLeftContainerStyle: { paddingLeft: 15 },
				headerRightContainerStyle: { paddingRight: 15 },
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerTitle: "", headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const Main = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.default },
				headerLeftContainerStyle: { paddingLeft: 15 },
				headerRightContainerStyle: { paddingRight: 15 },
				headerShadowVisible: false,
				headerTitle: false,
			}}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="school"
							size={24}
							color={focused ? Colors.blue : Colors.default}
						/>
					),
					tabBarIconStyle: { marginTop: 10 },
					title: "",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="FollowingStack"
				component={FollowingStack}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome
							name="star"
							size={24}
							color={focused ? Colors.blue : Colors.default}
						/>
					),
					tabBarIconStyle: { marginTop: 10 },
					title: "",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="WriteBoardStack"
				component={WriteBoardStack}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name="md-add-circle"
							size={26}
							color={focused ? Colors.blue : Colors.default}
						/>
					),
					tabBarIconStyle: { marginTop: 10 },
					title: "",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Alert"
				component={AlertScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome
							name="bell"
							size={24}
							color={focused ? Colors.blue : Colors.default}
						/>
					),
					tabBarIconStyle: { marginTop: 10 },
					title: "",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="ProfileStack"
				component={ProfileStack}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="user-alt"
							size={24}
							color={focused ? Colors.blue : Colors.default}
						/>
					),
					tabBarIconStyle: { marginTop: 10 },
					title: "",
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

const AuthenticatedTab = () => {
	return <Main />;
};

const Navigation = () => {
	const authContext = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!authContext.isAuthenticated && <AuthStack />}
			{authContext.isAuthenticated && <AuthenticatedTab />}
		</NavigationContainer>
	);
};

const Root = () => {
	const [isTryingLogin, setIsTryingLogin] = useState(true);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const fetchToken = async () => {
			const storedToken = await AsyncStorage.getItem("token");

			if (storedToken) {
				const user_id = await AsyncStorage.getItem("user_id");
				const nickname = await AsyncStorage.getItem("nickname");
				const name = await AsyncStorage.getItem("name");
				const phone = await AsyncStorage.getItem("phone");
				const email = await AsyncStorage.getItem("email");
				const school = await AsyncStorage.getItem("school");
				const data = {
					jwt: storedToken,
					user_id: user_id,
					nickname: nickname,
					name: name,
					phone: phone,
					email: email,
					school: school,
				};
				authContext.authenticate(data);
			}
			setIsTryingLogin(false);
		};
		fetchToken();
	}, []);

	// if (isTryingLogin) {
	// 	return <AppLoading />;
	// }
	return <Navigation />;
};

export default function App() {
	return (
		<>
			<StatusBar style="dark" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
