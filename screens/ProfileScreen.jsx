import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Dimensions,
	SafeAreaView,
} from "react-native";
import { useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

import Profile from "../components/profle/Profile";
import MyActivity from "../components/profle/MyActivity";
import Setting from "../components/profle/Setting";
import Info from "../components/profle/Info";
import { Colors } from "../constants/styles";
const ProfileScreen = () => {
	const authContext = useContext(AuthContext);
	const { user_id, nickname, name, phone, email, school } = authContext;
	
	const onLogoutHandler = () => {
		try {
			authContext.logout();
		} catch (err) {
			Alert.alert("로그아웃 실패", "다시 시도해주세요.");
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<Profile nickname={nickname} school={school}/>
			<MyActivity />
			<Setting />
			<Info />
			<Pressable onPress={onLogoutHandler} style={styles.logoutContainer}>
				<Text style={styles.text}>로그아웃</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
	},
	logoutContainer: {
		marginTop: 15,
		alignItems: "flex-end",
	},
	text: {
		color: Colors.Grayicon,
	},
});
