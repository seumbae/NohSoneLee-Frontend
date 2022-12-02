import { StyleSheet, Text, View, Pressable } from "react-native";

import { Colors } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Info = () => {
  const onPressContact = () => {
    //TODO
    console.log("문의하기");
  }

  const onPressNotice = () => {
    //TODO
    console.log("공지사항"); 
  }

  const onPressProvision = () =>{
    //TODO
    console.log("이용약관");
  }

  const onPressWithdrawal = () => {
    //TODO
    console.log("회원탈퇴");
  }

  const onPressLogout = () => {
    //TODO
    console.log("로그아웃");
  }
	return (
		<View style={styles.root}>
			<Text style={styles.title}>정보</Text>
			<View style={styles.container}>
				<Pressable onPress={onPressContact} style={[styles.directionRow]}>
        <MaterialCommunityIcons name="comment-text-outline" size={19} color={Colors.font400} />
					<Text style={styles.subTitle}>문의 하기</Text>
				</Pressable>
				<Pressable onPress={onPressNotice} style={styles.directionRow}>
        <AntDesign name="notification" size={18} color={Colors.font400} />
          <Text style={styles.subTitle}>공지사항</Text>
				</Pressable>
        <Pressable onPress={onPressProvision} style={styles.directionRow}>
        <Ionicons name="md-documents-outline" size={20} color={Colors.font400} />
          <Text style={styles.subTitle}>서비스 이용약관</Text>
				</Pressable>
        <Pressable onPress={onPressWithdrawal} style={styles.directionRow}>
        <MaterialCommunityIcons name="cancel" size={20} color={Colors.font400} />
					<Text style={styles.subTitle}>회원 탈퇴</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Info;

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
    height: 35,
	},
	subTitle: {
		marginLeft: 10,
		fontSize: 16,
		fontWeight: "500",
	},
});
