import { useContext, useState } from "react";
import { tryLogin } from "../services/axios";
import {
	Alert,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import { Colors } from "../constants/styles";

function LoginScreen({navigation}) {
	const authContext = useContext(AuthContext);
	
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token,setToken] = useState("");

	const loginHandler = async () => {
		const data = {user_id: email, password: password};
		setIsAuthenticating(true);
		try {
			const res = await tryLogin(data);
			authContext.authenticate(res.data.data);
		} catch (err) {
			Alert.alert("로그인 실패", "다시 시도해주세요.");
			setIsAuthenticating(false);
		}
	};

	const signupHandler = () => {
		navigation.navigate("Signup");
	}

	if (isAuthenticating) {
		return <LoadingOverlay />;
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView contentContainerStyle={{flex:1}}>
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
			{/* 로고 넣기 */}
			<View style={styles.body}>
				<Text>로고 들어갈 자리</Text>
				<View style={[styles.inputContainer, styles.email]}>
					<TextInput
						style={styles.input}
						onChangeText={(text) => setEmail(text)}
						placeholder="이메일"
						placeholderTextColor={Colors.Grayicon}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						spellCheck={false}
						autoComplete={false}
						autoCorrect={false}
					/>
				</View>
				<View style={[styles.inputContainer]}>
					<TextInput
						style={styles.input}
						onChangeText={(text) => setPassword(text)}
						placeholder="비밀번호"
						placeholderTextColor={Colors.Grayicon}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						secureTextEntry={true}
						onPressIn={() => setPassword("")}
					/>
				</View>
				<Pressable style={styles.login} onPress={loginHandler}>
						<Text style={styles.loginText}>로그인</Text>
				</Pressable>
				<Pressable style={styles.signupContainer} onPress={signupHandler}>
						<Text style={styles.signup}>계정이 없으신가요?</Text>
				</Pressable>
			</View>
			
		</KeyboardAvoidingView>
		</ScrollView>
		</SafeAreaView>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	body: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 30,
	},
	inputContainer:{
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 25,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderWidth: 1,
		borderColor: Colors.font400,
		backgroundColor: "#FFFFFF",
	},
	email:{
		marginVertical: 15,
	},
	input: {
		backgroundColor: "#FFFFFF",
		paddingTop: 0, paddingBottom: 0 
	},
	login:{
		marginTop: 30,
		backgroundColor: Colors.deepblue,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 25,
		alignItems: 'center',
	},
	loginText:{
		color: "#FFFFFF",
		fontSize: 16,
	},
	signupContainer:{
		marginTop: 15,
		alignItems: 'flex-end',
	},
	signup:{
		color: Colors.font600,
	}
});
