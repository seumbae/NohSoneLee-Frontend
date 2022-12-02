import { useEffect, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
	StyleSheet,
	Platform,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	Button,
	View,
	Text,
	Pressable,
	Dimensions,
} from "react-native";
import { WriteComment } from "../services/axios";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PreviousButton from "../components/ui/PreviousButton";
import SearchBar from "../components/ui/SearchBar";
import { Colors } from "../constants/styles";
import { getBoardDetail, addLike, deleteLike } from "../services/axios";
import Board from "../components/Board";
import Comment from "../components/Comment";


const deviceWidth = Dimensions.get("window").width;

const BoardDetail = ({ navigation }) => {
	const route = useRoute();
	const { id, school } = route.params;
	const [board, setBaord] = useState([]);
	const [comment, setComment] = useState([]);
	const [statusbarHeight, setStatusbarHeight] = useState(0);
	const [commentText, setCommentText] = useState("");
  const [likeClicked, setlikeClicked] = useState(false);
	const onPress = () => {
		navigation.dispatch(CommonActions.goBack());
	};

  const [token, setToken] = useState(null);

	const registerCommentHandler = () => {
    //BoardId, content
    const data = {BoardId: board.id, content: commentText};
		try{
      WriteComment(token, data).then((res) =>{
        console.log(res.data.success);
        setCommentText("");
      });
    }catch(e){
      console.log(e);
    }
	};

  const LikeHandler = () => {
    const data = {board_id: board.id};
    try{
      addLike(token, data).then((res) =>{
        console.log(res.data.success);
      });
    }catch(e){
      console.log(e);
    }
    setlikeClicked((prev) => !prev);
  };

	useLayoutEffect(() => {
		const getToken = async () => {
			setToken(await AsyncStorage.getItem("token"));
		}
		getToken();
	},[]);

	useLayoutEffect(() => {
		getBoardDetail(id).then((res) => {
			setBaord(res.data.data[0][0]);
      setComment(res.data.data[1]);
		});
	}, [navigation, setCommentText, likeClicked]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerBackVisible: false,
			headerLeft: () => <PreviousButton onPress={onPress} />,
			headerRight: () => <SearchBar school={school} />,
		});
		setStatusbarHeight(getStatusBarHeight());
	}, [navigation]);

	return (
		<View style={{ flex: 1, justifyContent: "space-between" }}>
			<ScrollView style={styles.container}>
				<Board board={board} school={school} LikeHandler={LikeHandler}/>
				{comment.map((item) => {
					return <Comment item={item} key={item.board_id} />;
				})}
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={statusbarHeight + 44}
			>
				<View style={styles.comment}>
					<View style={styles.commentContainer}>
						<TextInput
							style={styles.input}
							onChangeText={(text) => setCommentText(text)}
							placeholder="댓글을 입력하세요"
							placeholderTextColor={Colors.Grayicon}
							underlineColorAndroid="transparent"
							multiline={true}
						/>
						<Pressable onPress={registerCommentHandler}>
							<Text style={styles.text}>등록</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BoardDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
	},
	comment: {
		backgroundColor: Colors.default,
		paddingHorizontal: 10,
		borderTopWidth: 1,
		borderTopColor: Colors.font400,
	},
	commentContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 25,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: Colors.font400,
		backgroundColor: "#FFFFFF",
		width: deviceWidth * 0.9,
	},
	input: {
		backgroundColor: "#FFFFFF",
		width: deviceWidth * 0.75,
	},
	text: {
		color: Colors.blue,
	},
});
