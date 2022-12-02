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

const HomeSearchScreen = ({ navigation }) => {
	const [recentSearchesSchool, setRecentSearchesSchool] = useState([]);
	const [rank, setRank] = useState([]);
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
			setRecentSearchesSchool(
				await AsyncStorage.getItem("recentSearchesSchool")
			);
		};
		getData();
	}, []);

	useLayoutEffect(() => {
		getRank().then((res) => {
			setRank(res.data.data);
		});
	}, []);

	//급상승 순위 조회 school get
	// {
	//   "success": true,
	//   "data": [
	//       {
	//           "name": "서울대학교",
	//           "count": 3
	//       }
	//     }
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.recentContainer}>
				<View style={styles.recentTitle}>
					<Text style={styles.subTitle}>최근 검색</Text>
					<Text style={styles.subTitle}>전체 삭제</Text>
					{recentSearchesSchool?.map((recentSearch) => {
						return (
							<View style={styles.searchContainer}>
								<View style={styles.school}>
									<ItemImage school={recentSearch} />
									<Text style={styles.recentSearch}>{recentSearch}</Text>
								</View>
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
					{rank?.map((item) => {
						return (
							<View style={styles.searchContainer}>
								<View style={styles.school}>
									<ItemImage school={item.name} />
									<View>
										<Text style={styles.recentSearch}>{item.name}</Text>
									</View>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		</ScrollView>
	);
};

export default HomeSearchScreen;

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
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
    marginVertical: 10,
	},
	school: {
		flexDirection: "row",
    alignItems: "center",
	},
	recentSearch: {
		fontSize: 16,
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
