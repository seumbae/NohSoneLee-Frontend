import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { getFollowList, getSchool } from "../services/axios";
import { Lists } from "../components/BoardList";
import { CATEGORIES } from "../data/university";

import Logo from "../components/ui/Logo";
import SearchBar from "../components/ui/SearchBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FollowingScreen = ({ navigation }) => {
	const [token, setToken] = useState(null);

	const [followList, setFollowList] = useState([]);
	const [lists, setLists] = useState([]);
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
		const onPressHandler = () => {
			navigation.navigate("FollowingSearchScreen");
		}
		navigation.setOptions({
			headerLeft: () => <Logo />,
			headerRight: () => <Pressable onPress={onPressHandler}><SearchBar /></Pressable>,
		});
	}, [navigation]);

	useLayoutEffect(() => {
		const getToken = async () => {
			setToken(await AsyncStorage.getItem("token"));
		}
		getToken();
	},[]);

	useLayoutEffect( () => {
		getFollowList(token).then((res) => {
			setFollowList(res.data.data);
		});
	}, [navigation, token]);

	useLayoutEffect(() => {
		followList?.map((item) => {
			getSchool(item.school_id).then((res) => {
				res.data.data[1].map((item) => {
					setLists((prev) => [...prev, item]);
				});
			});
		});
	}, [followList, token]);

	const renderItem = ({ item }) => <Lists item={item} nav='following'/>;
	return (
		<View style={styles.container}>
			{lists.length > 0 ? (
				<FlatList
					data={lists}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			) : (
				<Text>팔로우한 학교가 없습니다.</Text>
			)}
		</View>
	);
};

export default FollowingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
		marginTop: 15,
	},
	text: {
		textAlign: "center",
	},
});
