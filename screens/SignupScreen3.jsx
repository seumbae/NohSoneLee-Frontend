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
import { createUser } from "../util/auth";
import Circle from "../components/ui/Circle";
import Line from "../components/ui/Line";
import Input from "../components/ui/Input";
import { AntDesign } from "@expo/vector-icons";

function SignupScreen2({ navigation, route }) {
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [school, setSchool] = useState("세종대학교");

	const signupHandler = async () => {
		const data = {
      user_id: route.params.email,
			email: route.params.email,
			nickname: nickname,
			password: password,
			school_id: 1,
			name: "노승배",
			phone: "010-1234-5678",
		};
		if (password !== passwordConfirm) {
			Alert.alert("비밀번호가 일치하지 않습니다.");
      setPassword("");
      setPasswordConfirm("");
		} else {
			try {
				await createUser(data);
        navigation.replace('Login');
			} catch (err) {
				Alert.alert("계정 생성 실패", "다시 시도해주세요.");
			}
		}
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
							<Line color={Colors.deepblue} />
							<Circle color={Colors.deepblue} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
						</View>
						<View style={styles.nickConatiner}>
							<Text style={styles.nick}>닉네임</Text>
							<Input placeholder='닉네임' handler={setNickname} password={false} />
						</View>
						<View style={styles.passwordConatiner}>
							<Text style={styles.password}>비밀번호</Text>
							<Text style={styles.passwordText}>
								영문 + 숫자 + 특수문자 조합 8자 이상
							</Text>
							<Input placeholder='비밀번호' handler={setPassword} password={true} />
							<Input placeholder='비밀번호 확인' handler={setPasswordConfirm} password={true} />
						</View>
						<View style={styles.schoolRoot}>
							<Text style={styles.schoolTitle}>학교</Text>
							<View style={styles.schoolContainer}>
								<Text style={styles.school}>세종대학교</Text>
							</View>
						</View>
						<Pressable style={styles.extra}>
							<AntDesign
								name="questioncircle"
								size={16}
								color={Colors.font400}
							/>
							<Text style={styles.extraText}>학교가 잘못 인증 되었나요?</Text>
						</Pressable>
						<Pressable onPress={signupHandler} style={styles.button}>
							<Text style={styles.text}>가입 완료</Text>
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
	nickConatiner: {
		width: "100%",
		marginTop: 45,
	},
	nick: {
		fontWeight: "bold",
		marginBottom: 10,
	},
	passwordConatiner: {
		width: "100%",
		marginVertical: 20,
	},
	password: {
		fontWeight: "bold",
	},
	passwordText: {
		marginVertical: 5,
		fontSize: 10,
		color: Colors.Grayicon,
		fontWeight: "bold",
	},
	schoolRoot: {
		width: "100%",
	},
	schoolTitle: {
		fontWeight: "bold",
	},
	schoolContainer: {
		marginTop: 10,
		backgroundColor: "#FFFFFF",
		borderColor: Colors.font400,
		borderRadius: 25,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderWidth: 1,
	},
	school: {
		fontWeight: "bold",
	},
	button: {
		marginTop: 50,
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
		marginTop: 10,
	},
	extraText: {
		marginLeft: 5,
		fontSize: 12,
		color: Colors.font600,
	},
});
