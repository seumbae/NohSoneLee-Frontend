import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const Complete = ({onPress}) => {
	return (
		<Pressable onPress={onPress}>
			<View style={styles.completeContainer}>
				<Text style={styles.completeText}>완료</Text>
			</View>
		</Pressable>
	);
};

export default Complete;

const styles = StyleSheet.create({
	completeContainer: {
		width: 50,
		height: 40,
		backgroundColor: "#FFFFFF",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
	},
	completeText: {
		color: Colors.blue,
		fontWeight: "bold",
	},
});
