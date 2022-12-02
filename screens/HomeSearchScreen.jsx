import { useLayoutEffect, useState } from "react";
import {
	Alert,
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
} from "react-native";
import { CATEGORIES } from "../data/university";
import PreviousButton from "../components/ui/PreviousButton";
import SearchBar from "../components/ui/SearchBar";
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

const HomeSearchScreen = ({ navigation, route }) => {
	const { size } = route.params;
	const [recentSearchesSchool, setRecentSearchesSchool] = useState(null);
	const [rank, setRank] = useState([]);
	const [text, setText] = useState("");
	const [searchPressed, setSearchPressed] = useState(false);

	const onSubmitEditingHandler = (e) => {
		const school = e.nativeEvent.text;
		if (CATEGORIES.some((item) => item.school === school)) {
			navigation.navigate("SchoolScreen", { school: school, width: 0.75 });
		} else {
			Alert.alert(
				"검색 실패",
				"정확한 대학교 이름을 입력해주세요.\n(예. 서울과학기술대학교)"
			);
		}
	};

	useLayoutEffect(() => {
		const onPress = () => {
			navigation.goBack();
		};
		navigation.setOptions({
			headerTitle: "",
			headerBackVisible: false,
			headerLeft: () => <PreviousButton onPress={onPress} />,
			headerRight: () => (
				<SearchBar
					size={size}
					autoFocus={true}
					onUpdateValue={setText}
					onSubmitEditingHandler={onSubmitEditingHandler}
				/>
			),
		});
	}, [navigation]);

	useLayoutEffect(() => {
		setRecentSearchesSchool(recentSearchesSchool);
	}, [navigation]);

	useLayoutEffect(() => {
		getRank().then((res) => {
			let tmp = res.data.data;
			tmp.sort((a, b) => {
				return b.count - a.count;
			});
			setRank(tmp);
		});
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.recentContainer}>
				<View style={styles.recentTitle}>
					<View style={styles.subTitleContainer}>
						<Text style={styles.subTitle}>최근 검색 학교</Text>
						<Text style={styles.subTitle}>전체 삭제</Text>
					</View>
					{recentSearchesSchool?.map((recentSearch) => {
						return (
							<View style={styles.searchContainer}>
								<View style={styles.school}>
									<ItemImage school={recentSearch} />
									<Text style={styles.recentSearch}>{recentSearch}</Text>
								</View>
								<View>
									<Text
										style={styles.icon}
										onPress={deleteHandler(recentSearch)}
									>
										X
									</Text>
								</View>
							</View>
						);
					})}
				</View>
			</View>
			<View style={styles.trendingContainer}>
				<View style={styles.trendingTitle}>
					<Text style={styles.subTitle}>급상승 학교</Text>
					{rank?.map((item) => {
						return (
							<View style={styles.schoolContainer} key={item.name}>
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
	recentTitle: {},
	subTitleContainer: {
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
		alignItems: "center",
		marginVertical: 3,
	},
	schoolContainer: {
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
		width: deviceWidth * 0.12,
		height: deviceWidth * 0.12,
		marginRight: 15,
	},
	trendingContainer: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
	},
});
