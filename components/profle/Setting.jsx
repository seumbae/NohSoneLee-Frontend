import { StyleSheet, Text, View, Pressable } from "react-native";

import { Colors } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';

const Setting = () => {
  const onPressAlert = () => {
    //TODO
    console.log("알림");
  }

  const onPressApproval = () => {
    //TODO
    console.log("수신 동의"); 
  }

	return (
		<View style={styles.root}>
			<Text style={styles.title}>설정</Text>
			<View style={styles.container}>
				<Pressable onPress={onPressAlert} style={[styles.directionRow, {marginLeft: 3}]}>
        <Fontisto name="bell" size={20} color={Colors.font400} />
					<Text style={styles.subTitle}>알림 설정</Text>
				</Pressable>
				<Pressable onPress={onPressApproval} style={[styles.directionRow, {marginLeft: 3, marginTop: 20}]}>
        <Fontisto name="checkbox-active" size={16} color={Colors.font400} />
					<Text style={styles.subTitle}>광고성 정보 수신동의</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Setting;

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
