import { useLayoutEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { searchBoard } from "../services/axios";
import { Lists } from "../components/BoardList";
import PreviousButton from "../components/ui/PreviousButton";
import SearchBar from "../components/ui/SearchBar";

const SearchBoardScreen = ({ navigation ,route }) => {
	const parentText = route.params.text;
	console.log(parentText);
	const [list, setList] = useState([]);
  const [text, setText] = useState("");

  const onSubmitEditing = () => {
    navigation.navigate("SearchBoardScreen", { text : text });
  }

  useLayoutEffect(() => {
		const onPress = () => {
			navigation.goBack();
		};
		navigation.setOptions({
			headerTitle: "",
			headerBackVisible: false,
			headerLeft: () => <PreviousButton onPress={onPress} />,
			headerRight: () => <SearchBar autoFocus={true} onUpdateValue={setText} onSubmitEditing={onSubmitEditing} />,
		});
	}, [navigation]);

	useLayoutEffect(() => {
		searchBoard().then((res) => {
			setList(res.data.data);
		});
	}, []);
	const renderItem = ({ item }) => <Lists item={item} />;

	return (
    <View style={styles.container}>
		<FlatList
			data={list}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			onEndReachedThreshold={0.8}
		></FlatList>
    </View>
	);
};

export default SearchBoardScreen;

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    paddingHorizontal: 15,
  },
});
