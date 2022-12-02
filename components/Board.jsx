import {
	View,
	Text,
	Dimensions,
	Image,
  StyleSheet,
	Pressable
} from "react-native";

import moment from "moment-timezone";

import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const calcTime = (reg) => {
	const date = moment(reg);
	const now = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
	return moment(now).diff(date, "minutes");
};

const Board = ({board, school, LikeHandler}) => {
	let src = "";
	switch (school) {
		case "세종대학교":
			src = require("../assets/school/sejong.png");
			break;
		case "연세대학교":
			src = require("../assets/school/yonsei.png");
			break;
		case "서울과학기술대학교":
			src = require("../assets/school/science_technology.png");
			break;
		case "동국대학교":
			src = require("../assets/school/dongguk.png");
			break;
		case "홍익대학교":
			src = require("../assets/school/hongik.png");
			break;
		case "건국대학교":
			src = require("../assets/school/konkuk.png");
			break;
		case "국민대학교":
			src = require("../assets/school/kookmin.png");
			break;
		case "고려대학교":
			src = require("../assets/school/korea.png");
			break;
	}

	const gapTime = calcTime(board.regdate);

	let time = "";
	if (gapTime < 60) {
		time = `${gapTime}분 전`;
	} else if (gapTime < 1440) {
		time = `${Math.floor(gapTime / 60)}시간 전`;
	} else if (gapTime < 10080) {
		time = `${Math.floor(gapTime / 1440)}일 전`;
	} else if (gapTime < 43800) {
		time = `${Math.floor(gapTime / 10080)}주 전`;
	} else if (gapTime < 525600) {
		time = `${Math.floor(gapTime / 43800)}개월 전`;
	} else {
		time = `${Math.floor(gapTime / 525600)}년 전`;
	}
	return (
		<View style={styles.listContainer}>
			<View style={styles.header}>
				<View>
					<Image source={src} style={styles.image} />
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.info}>
						<View style={styles.schoolContainer}>
							<Text style={styles.schoolName}>{school}</Text>
							<Text style={styles.topic}>{board.topic}</Text>
						</View>
						<View style={styles.time}>
							<Text style={styles.text600}>{time}</Text>
						</View>
					</View>
					<View style={styles.profile}>
						<Text style={[styles.text600, styles.writer]}>{board.writer}</Text>
						<Text style={styles.text600}>{board.writer_school}</Text>
					</View>
				</View>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{board.title}</Text>
				<Text style={[styles.text600, styles.content]}>{board.content}</Text>
			</View>
			<View style={styles.extraContainer}>
				<Pressable onPress={LikeHandler} style={[styles.extraMargin, styles.profile]}>
					<FontAwesome name="heart" size={12} color={Colors.Grayicon} />
					<Text style={styles.extra}> {board.like_count}</Text>
				</Pressable>
				<View style={[styles.extraMargin, styles.profile]}>
					<MaterialIcons name="comment" size={12} color={Colors.Grayicon} />
					<Text style={styles.extra}> {board.comment_count}</Text>
				</View>
				<View style={styles.profile}>
					<Ionicons name="eye" size={12} color={Colors.Grayicon} />
					<Text style={styles.extra}> {board.view_count}</Text>
				</View>
			</View>
		</View>
	);
};

export default Board;

const styles = StyleSheet.create({
  listContainer: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
	},
	header: {
		flexDirection: "row",
		flex: 1,
	},
	image: {
		width: deviceWidth * 0.1,
		height: deviceWidth * 0.1,
		borderRadius: deviceWidth * 0.5,
		marginRight: 5,
	},
	infoContainer: {
		flex: 1,
	},
	info: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
	},
	schoolContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	schoolName: {
		fontWeight: "bold",
		marginRight: 8,
		fontSize: 16,
	},
	topic: {
		fontSize: 12,
	},
	time: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
	writer: {
		marginRight: 5,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
	},
	contentContainer: {
		flex: 1,
		marginTop: 15,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	content: {
		marginTop: 10,
	},
	extraContainer: {
		marginTop:10,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	extraMargin: {
		marginRight: 10,
	},
	extra: {
		color: Colors.Grayicon,
		fontSize: 12,
	},
	text600: {
		color: Colors.font600,
		fontSize: 12,
	},
})