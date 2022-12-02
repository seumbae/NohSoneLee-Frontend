import { useEffect, useLayoutEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
} from "react-native";
import PreviousButton from "../components/ui/PreviousButton";
import SearchBar from "../components/ui/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/styles";
import { getRank } from "../services/axios";

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

const ItemImage = ({ school }) => {
	return <Image style={styles.image} source={GetImage(school)} />;
};

const deviceWidth = Dimensions.get("window").width;

const FollowingSearchScreen = ({ navigation }) => {
	const [recentSearches, setRecentSearches] = useState([]);
	const topic = [
		{ color: "#B14C86", topic: "동아리" },
		{ color: "#CC94FF", topic: "공모전" },
		{ color: "#FFB9DF", topic: "편입" },
		{ color: "#FFFF95", topic: "학과 학업" },
		{ color: "#A7C84E", topic: "학생회" },
		{ color: "#57A8F2", topic: "대외 활동" },
		{ color: "#FFB355", topic: "장학금" },
	];

	useLayoutEffect(() => {
		const onPress = () => {
			navigation.goBack();
		};
		navigation.setOptions({
			headerTitle: "",
			headerBackVisible: false,
			headerLeft: () => <PreviousButton onPress={onPress} />,
			headerRight: () => <SearchBar autoFocus={true} />,
		});
	}, [navigation]);

	useLayoutEffect(() => {
		const getData = async () => {
			setRecentSearches(await AsyncStorage.getItem("recentSearches"));
		};
		getData();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.recentContainer}>
				<View style={styles.recentTitle}>
					<Text style={styles.subTitle}>최근 검색</Text>
					<Text style={styles.subTitle}>전체 삭제</Text>
					{recentSearches?.map((recentSearch) => {
						return (
							<View style={styles.searchContainer}>
								<Text style={styles.recentSearch}>{recentSearch}</Text>
								<View>
									<Text style={styles.icon}>X</Text>
								</View>
							</View>
						);
					})}
				</View>
			</View>
			<View style={styles.trendingContainer}>
				<View style={styles.trendingTitle}>
					<Text style={styles.subTitle}>인기 토픽</Text>
					{topic?.map((item) => {
						return (
							<View style={styles.searchContainer}>
								<View style={styles.topicBody}>
									<View
										style={[styles.cirlce, { backgroundColor: item.color }]}
									/>
									<Text style={styles.recentSearch}>{item.topic}</Text>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		</ScrollView>
	);
};

export default FollowingSearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		marginTop: 5,
	},
	recentContainer: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
	},
	recentTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	subTitle: {
		fontSize: 12,
		color: Colors.font600,
		marginBottom: 10,
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	topicBody: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
	},
	cirlce: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	recentSearch: {
		fontSize: 16,
    marginLeft: 10,
	},
	icon: {
		fontSize: 12,
		color: Colors.font600,
	},
	image: {
		width: deviceWidth * 0.15,
		height: deviceWidth * 0.15,
		marginRight: 15,
	},
	trendingContainer: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
	},
});
