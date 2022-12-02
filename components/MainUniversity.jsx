import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	Pressable,
	FlatList,
} from "react-native";
import moment from "moment-timezone";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from "../data/university";

import {
	getFollowList,
	addFollow,
	deleteFollow,
	getSchool,
} from "../services/axios";
import AutoHeightImage from "react-native-auto-height-image";
import { Colors } from "../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";


const deviceWidth = Dimensions.get("window").width;

const GetImage = (school) => {
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
		default:
			src = "";
	}
	return src;
};

const calcTime = (reg) => {
	const date = moment(reg);
	const now = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
	return moment(now).diff(date, "minutes");
};

const Lists = ({ item }) => {
	const navigation = useNavigation();

	const src = GetImage(item.school);

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
		navigation.navigate("BoardDetail", {
			id: item.id,
			school: item.school,
		});
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
					<Text style={[styles.text600, styles.content]}>{item.content}</Text>
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

const MainUniversity = ({ school }) => {
	const [token, setToken] = useState(null);
	const [followList, setFollowList] = useState([{}]);
	const [isFollowed, setIsFollowed] = useState(false);

	const [schoolInfo, setSchoolInfo] = useState([]);
	const [relatedBoard, setRelatedBoard] = useState([{}]);
	const school_id = CATEGORIES.find((item) => item.school === school).id;
	
	const bookmarkHandler = () => {
		if (isFollowed === false || isFollowed === undefined) {
			addFollow(token, school_id)
				.then((res) => {
					console.log('팔로우 성공')
				})
				.catch(() => console.log("Add Failed"));
		} else {
			deleteFollow(token, school_id)
				.then((res) => {
					console.log("follow 취소 성공");
				})
				.catch(() => console.log("Delete Failed"));
		}
		setIsFollowed((prev) => !prev);
	};

	useLayoutEffect(() => {
		const getToken = async () => {
			setToken(await AsyncStorage.getItem("token"));
		}
		getToken();
	},[]);

	useLayoutEffect(() => {
		getFollowList(token)
			.then((res) => {
				const tmp = res.data.data;
				setFollowList(tmp);
			})
			.catch(() => console.log("FollowList Does not exist"));
	}, [token]);

	useLayoutEffect(() => {
		setIsFollowed(followList?.some((item) => item.name === school));
	},[followList]);

	useLayoutEffect(() => {
		// 학교 관련 정보 가져오기 위함
		getSchool(school_id).then((res) => {
			setSchoolInfo(res.data.data[0][0]);
			// res.data.data[1].map((item) => {
			// 	setRelatedBoard((prev) => [...prev, item]);
			// });
			setRelatedBoard(res.data.data[1]);
		});
	}, [isFollowed]);
	
	const renderItem = ({ item }) => <Lists item={item} />;

	return (
		<>
			<View style={styles.root}>
				<View style={styles.bookmarkContainer}>
					<Pressable onPress={bookmarkHandler}>
						{isFollowed=== true ? (
							<Image
								style={styles.bookmarkImage}
								source={require("../assets/bookmark_blue.png")}
							/>
						) : (
							<Image
							  style={styles.bookmarkImage}
								source={require("../assets/bookmark_gray.png")}
							/>
						)}
					</Pressable>
				</View>
				<View style={styles.schoolContainer}>
					<Image source={GetImage(school)} style={styles.Mainimage} />
					<View style={styles.schooInfo}>
						<Text style={styles.schoolTitle}>{school}</Text>
						<Text style={styles.address}>{schoolInfo.address}</Text>
					</View>
				</View>
				<View style={[styles.profile, {justifyContent:'flex-end'}]}>
					<FontAwesome5
							name="user-alt"
							size={12}
							color={Colors.Grayicon}
							style={{marginRight: 5}}
						/>
						<Text style={styles.extra}>{schoolInfo.follow_count}</Text>
					</View>
			</View>
			<FlatList
				data={relatedBoard}
				renderItem={renderItem}
				// keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.8}
			/>
		</>
	);
};

export default MainUniversity;

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		marginBottom: 20,
	},
	bookmarkContainer: {
		alignItems: "flex-end",
	},
	bookmarkImage:{
		width: deviceWidth * 0.04,
		height: 360*0.07,
	},
	Mainimage: {
		width: deviceWidth * 0.2,
		height: deviceWidth * 0.2,
		marginRight: 10,
	},
	schoolContainer: {
		flexDirection: "row",
	},
	schooInfo: {
		flex: 1,
		marginLeft: 10,
	},
	schoolTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	address: {
		fontSize: 12,
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
		marignTop: 10,
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
