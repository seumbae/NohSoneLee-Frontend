import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, } from "react-native";
import { Colors } from "../constants/styles";

import SchoolLogoList from "../components/SchoolLogoList";
import Logo from "../components/ui/Logo";
import SearchBar from "../components/ui/SearchBar";
import BoardList from "../components/BoardList";


const HomeScreen = ({ navigation }) => {

	useEffect(() => {
		const onPressHandler = () => {
			navigation.navigate("HomeSearchScreen", {size: 0.75});
		}
		navigation.setOptions({
			headerLeft: () => <Logo />,
			headerRight: () => <Pressable onPress={onPressHandler}><SearchBar /></Pressable>,
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<FlatList data={null}
			ListHeaderComponent={SchoolLogoList}
			ListHeaderComponentStyle={styles.SchoolLists}
      ListFooterComponent={BoardList}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		marginTop: 30,
		backgroundColor: Colors.default,
	},
	SchoolLists:{
		marginBottom: 30,
	},
});
