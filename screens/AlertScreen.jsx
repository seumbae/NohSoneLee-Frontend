import { StyleSheet, Text, SafeAreaView } from "react-native";
import { Colors } from "../constants/styles";

const AlertScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>알람이 존재하지 않습니다</Text>
		</SafeAreaView>
	);
};

export default AlertScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text:{
		color: Colors.font600,
	}
});
