import { useLayoutEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WriteBoard } from "../services/axios";
import PreviousButton from "../components/ui/PreviousButton";
import Complete from "../components/ui/Complete";
import { Select } from "../components/ui/Select";

const WriteBoardScreen = ({ navigation }) => {
	const [token, setToken] = useState(null);
	const onPress = () => {
		navigation.goBack();
	};

	const onComplete = () => {
		WriteBoard(token, title, content, topic, schoolId).then((res) =>
			console.log(res.data.success)
		);
		setSchoolId("");
		setTitle("");

		navigation.dispatch(CommonActions.goBack());
	};
	useLayoutEffect(() => {
		const getToken = async () => {
			setToken(await AsyncStorage.getItem("token"));
		}
		getToken();
	},[]);

	const [schoolId, setSchoolId] = useState("");
	const [topic, setTopic] = useState("");

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View>
					<PreviousButton onPress={onPress} />
				</View>
				<View style={{ width: 200 }}>
					<Select setSchoolId={setSchoolId} />
					<Select setTopic={setTopic} />
				</View>
				<View>
					<Complete onPress={onComplete} />
				</View>
			</View>
			<View style={styles.body}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>제목</Text>
					<TextInput
						style={{ marginRight: 30 }}
						multiline={true}
						placeholder="제목을 입력해주세요."
						onChangeText={(text) => setTitle(text)}
						autoCapitalize="none"
					/>
				</View>
				<View style={styles.horizontalLine} />
				<View style={styles.titleContainer}>
					<Text style={styles.title}>내용</Text>
					<TextInput
						style={{ marginRight: 30 }}
						multiline={true}
						placeholder="내용을 입력해주세요."
						onChangeText={(text) => setContent(text)}
						autoCapitalize="none"
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default WriteBoardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 15,
		zIndex: 1,
	},
	select: {
		marginTop: 15,
		marginHorizontal: 15,
		alignItems: "center",
		marginRight: 25,
	},
	body: {
		backgroundColor: "#FFFFFF",
		marginHorizontal: 15,
		borderRadius: 15,
		padding: 15,
		zIndex: -1,
		flex: 1,
	},
	titleContainer: {
		flexDirection: "row",
	},
	title: {
		marginRight: 15,
		marginTop: 6,
	},
	horizontalLine: {
		borderBottomColor: "#E5E5E5",
		borderBottomWidth: 1,
		marginVertical: 15,
	},
});
