import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Image,
	Dimensions,
	Pressable,
} from "react-native";

import moment from "moment-timezone";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import DownIcon from "../components/ui/DownIcon";
import { getBoardList } from "../services/axios";
import { Colors } from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const calcTime = (reg) => {
	const date = moment(reg);
	const now = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
	return moment(now).diff(date, "minutes");
};

export const Lists = ({ item, nav }) => {
	const navigation = useNavigation();

	let src = "";
	switch (item.school) {
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

	const selectBoardHandler = () => {
		if (nav === "following") {
			navigation.navigate("FollowingBoardDetail", {
				id: item.id,
				school: item.school,
			});
		} else {
			navigation.navigate("BoardDetail", {
				id: item.id,
				school: item.school,
			});
		}
	};
	return (
		<Pressable onPress={selectBoardHandler}>
			<View style={styles.listContainer}>
				<View style={styles.header}>
					<View>
						<Image source={src} style={styles.image} />
					</View>
					<View style={styles.infoContainer}>
						<View style={styles.info}>
							<View style={styles.schoolContainer}>
								<Text style={styles.schoolName}>{item.school}</Text>
								<Text style={styles.topic}>{item.topic}</Text>
							</View>
							<View style={styles.time}>
								<Text style={styles.text600}>{time}</Text>
							</View>
						</View>
						<View style={styles.profile}>
							<Text style={[styles.text600, styles.writer]}>{item.writer}</Text>
							<Text style={styles.text600}>{item.writer_school}</Text>
						</View>
					</View>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={[styles.text600, styles.content]} numberOfLines={2} ellipsizeMode="tail">{item.content}</Text>
				</View>
				<View style={styles.extraContainer}>
					<View style={[styles.extraMargin, styles.profile]}>
						<FontAwesome name="heart" size={12} color={Colors.Grayicon} />
						<Text style={styles.extra}> {item.like_count}</Text>
					</View>
					<View style={[styles.extraMargin, styles.profile]}>
						<MaterialIcons name="comment" size={12} color={Colors.Grayicon} />
						<Text style={styles.extra}> {item.comment_count}</Text>
					</View>
					<View style={styles.profile}>
						<Ionicons name="eye" size={12} color={Colors.Grayicon} />
						<Text style={styles.extra}> {item.view_count}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const BoardList = () => {
	const [List, setList] = useState([]);

	useEffect(() => {
		getBoardList()
			.then((res) => {
				res.data.data.map((item) => {
					setList((prev) => [...prev, item]);
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const renderItem = ({ item }) => <Lists item={item} />;

	return (
		<>
			<View style={styles.boardSection}>
				<Text style={styles.SectionTitle}>인기글</Text>
				<DownIcon size="18" />
			</View>
			<FlatList
				data={List}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.8}
			></FlatList>
		</>
	);
};

export default BoardList;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
	},
	boardSection: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 10,
	},
	SectionTitle: {
		color: Colors.font600,
		fontSize: 12,
		marginRight: 5,
	},
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
	  marginTop: 10,
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
});
