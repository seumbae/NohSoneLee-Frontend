import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import Circle from "../components/ui/Circle";
import Line from "../components/ui/Line";
import Input from "../components/ui/Input";
import { AntDesign } from "@expo/vector-icons";

function SignupScreen2({ navigation, route }) {
	const PressHandler = () => {
		navigation.navigate("Signup3", { email: route.params.email });
	};

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView contentContainerStyle={styles.root}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.root}
				>
					<View style={styles.body}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>회원가입</Text>
						</View>
						<View style={styles.progress}>
							<Circle color={Colors.deepblue} />
							<Line color={Colors.deepblue} />
							<Circle color={Colors.deepblue} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
						</View>
						<View style={styles.authentiationContainer}>
							<Text style={styles.authentiation}>
								메일에 있는 '인증하기' 버튼을 눌러주세요.
							</Text>
						</View>
						<Text style={styles.spam}>
							*메일을 받지 못한 경우 스팸메일함을 확인해 주세요
						</Text>
						<Pressable style={styles.extra}>
							<AntDesign
								name="questioncircle"
								size={16}
								color={Colors.font400}
							/>
							<Text style={styles.extraText}>혹시 메일을 받지 못하셨나요?</Text>
						</Pressable>
						<Pressable onPress={PressHandler} style={styles.button}>
							<Text style={styles.text}>인증 완료</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignupScreen2;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	body: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 30,
	},
	titleContainer: {
		marginTop: 30,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	progress: {
		flexDirection: "row",
		alignItems: "center",
		height: 10,
		marginTop: 100,
	},
	authentiationContainer: {
		width: "100%",
		marginTop: 70,
		backgroundColor: "#FFFFFF",
		borderColor: Colors.font400,
		borderRadius: 25,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderWidth: 1,
		alignItems: "center",
	},
	authentiation: {
		color: Colors.font600,
	},
	spam: {
		marginTop: 15,
		width: "100%",
		fontSize: 12,
		color: Colors.font600,
	},
	button: {
		marginTop: 275,
		width: "100%",
		backgroundColor: Colors.deepblue,
		paddingHorizontal: 20,
		paddingVertical: 13,
		borderRadius: 25,
		alignItems: "center",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "bold",
	},
	extra: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
	},
	extraText: {
		marginLeft: 5,
		fontSize: 12,
		color: Colors.font600,
	},
});
