import { StyleSheet, Text, View, Pressable } from "react-native";

import { Colors } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';

const MyAcitivity = () => {
  const onPressActivity = () => {
    //TODO
    console.log("내 활동");
  }

  const onPressFavorite = () => {
    //TODO
    console.log("내 관심"); 
  }

	return (
		<View style={styles.root}>
			<Text style={styles.title}>내활동</Text>
			<View style={styles.container}>
				<Pressable onPress={onPressActivity} style={styles.directionRow}>
					<AntDesign
						name="filetext1"
						size={22}
						color={Colors.font400}
					/>
					<Text style={styles.subTitle}>내가 쓴 글</Text>
				</Pressable>
				<Pressable onPress={onPressFavorite} style={[styles.directionRow, styles.root]}>
					<AntDesign name="staro" size={22} color={Colors.font400}/>
					<Text style={styles.subTitle}>즐겨찾기</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default MyAcitivity;

const styles = StyleSheet.create({
	root: {
		marginTop: 15,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 10,
	},
	container: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderRadius: 15,
		marginTop: 10,
	},
	directionRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	subTitle: {
		marginLeft: 10,
		fontSize: 16,
		fontWeight: "500",
	},
});
