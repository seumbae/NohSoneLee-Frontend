import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Dimensions,
} from "react-native";

import { Colors } from "../../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const GetImage = (school) => {
	let src = "";
	switch (school) {
		case "세종대학교":
			src = require("../../assets/school/sejong.png");
			break;
		case "연세대학교":
			src = require("../../assets/school/yonsei.png");
			break;
		case "서울과학기술대학교":
			src = require("../../assets/school/science_technology.png");
			break;
		case "동국대학교":
			src = require("../../assets/school/dongguk.png");
			break;
		case "홍익대학교":
			src = require("../../assets/school/hongik.png");
			break;
		case "건국대학교":
			src = require("../../assets/school/konkuk.png");
			break;
		case "국민대학교":
			src = require("../../assets/school/kookmin.png");
			break;
		case "고려대학교":
			src = require("../../assets/school/korea.png");
			break;
		default:
			src = "";
	}
	return src;
};

const Profile = ({nickname, school}) => {
	const src = GetImage(school);

  const onPressEditHandler = () =>{
    console.log("edit");
  }

	return (
		<View style={styles.profile}>
			<View style={styles.profileContainer}>
				<Image
					source={src}
					style={styles.image}
				/>
				<View style={styles.info}>
					<View style={styles.univContainer}>
						<Text style={styles.univ}>{school}</Text>
					</View>
					<View>
						<Text>{nickname}</Text>
					</View>
				</View>
			</View>
			<Pressable onPress={onPressEditHandler} style={styles.editContainer}>
				<Text style={styles.edit}>편집</Text>
			</Pressable>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	image: {
		width: deviceWidth * 0.2,
		height: deviceWidth * 0.2,
	},
	profile: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 15,
		paddingTop: 20,
		paddingBottom: 10,
		borderWidth: 1,
		borderColor: Colors.font400,
		borderRadius: 15,
	},
	profileContainer: {
		flexDirection: "row",
	},
	info: {
		marginLeft: 15,
    justifyContent:"center",
	},
  univContainer:{
    paddingBottom: 10,
  },  
	univ: {
		fontSize: 22,
		fontWeight: "500",
	},
	editContainer: {
		alignItems: "flex-end",
	},
  edit:{
    fontSize: 12,
    fontWeight: "600",
    color: Colors.blue,
  }
});
