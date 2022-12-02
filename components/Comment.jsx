import { View, Text, Dimensions, Image, StyleSheet } from "react-native";

import moment from "moment-timezone";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const calcTime = (reg) => {
	const date = moment(reg);
	const now = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
	return moment(now).diff(date, "minutes");
};

const Comment = ({ item }) => {
	let src = "";
	switch (item.writer_school) {
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

	const gapTime = calcTime(item.regdate);

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
						<View style={styles.writerInfo}>
							<Text style={styles.writer}>{item.writer}</Text>
						</View>
						<View style={styles.time}>
							<Text style={styles.timeText}>{time}</Text>
						</View>
					</View>
					<View style={styles.schoolCotainer}>
						<Text style={styles.schoolName}>{item.writer_school}</Text>
					</View>
				</View>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.content}>{item.content}</Text>
			</View>
		</View>
	);
};

export default Comment;

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
    marginTop: 5,
	},
	writerInfo: {
	},
  schoolCotainer:{
    marginBottom: 2, 
  },
	schoolName: {
		fontSize: 10,
		color: Colors.font600,
	},
	time: {
	},
	timeText:{
		fontSize: 10,
		color: Colors.font600,
	},
	writer: {
		marginRight: 5,
    fontSize: 12,
	},
	contentContainer: {
		flex: 1,
		marginTop: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	content: {
		marginBottom: 10,
    color: Colors.font600,
    fontSize: 12,
	},
});
