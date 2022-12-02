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

function SignupScreen({ navigation }) {
	const [email, setEmail] = useState("");

	const PressHandler = () => {
		navigation.navigate("Signup2", { email: email });
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
						<View style={styles.explanationContainer}>
							<Text style={styles.explanation}>
								거기 어때는 정확한 정보 교류를 위해 이메일 인증 절차를 거쳐
							</Text>
							<Text style={styles.explanation}>
								회원 가입을 진행하고 있습니다.
							</Text>
							<Text style={styles.explanation}>
								입력한 이메일은 인증에만 사용합니다.
							</Text>
						</View>
						<View style={styles.progress}>
							<Circle color={Colors.deepblue} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
							<Line color={Colors.font400} />
							<Circle color={Colors.font400} />
						</View>
						<View style={styles.inputContainer}>
							<Input placeholder='학교 이메일을 입력하세요' handler={setEmail} />
						</View>
						<Pressable onPress={PressHandler} style={styles.button}>
							<Text style={styles.text}>인증 메일 보내기</Text>
						</Pressable>
						<Pressable style={styles.extra}>
							<AntDesign
								name="questioncircle"
								size={16}
								color={Colors.font400}
							/>
							<Text style={styles.extraText}>
								다른 인증 절차가 필요하신가요?
							</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignupScreen;

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
	explanationContainer: {
		marginTop: 20,
		alignItems: "center",
	},
	explanation: {
		fontSize: 12,
		color: Colors.font600,
	},
	progress: {
		flexDirection: "row",
		alignItems: "center",
		height: 10,
		marginTop: 40,
	},
	inputContainer: {
		width: "100%",
		marginTop: 130,
	},
	button: {
		marginTop: 20,
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
