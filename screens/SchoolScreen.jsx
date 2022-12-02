import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import MainUniversity from "../components/MainUniversity";
import PreviousButton from "../components/ui/PreviousButton";
import SearchBar from "../components/ui/SearchBar";

const SchoolScreen = ({navigation, route}) => {
	
	const {school} = route.params;
	const onPress = () => {
		navigation.goBack();
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerBackVisible: false,
			headerLeft: () => <PreviousButton onPress={onPress} />,
			headerRight: () => <SearchBar school={school}/>,
		});
	}, [navigation]);

	

	return (
		<View style={styles.container}>
			<MainUniversity school={school}/>
		</View>
	);
};

export default SchoolScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		marginTop: 30,
	},
	text: {
		textAlign: "center",
	},
});
