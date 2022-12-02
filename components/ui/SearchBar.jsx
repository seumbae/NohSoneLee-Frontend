import { StyleSheet, View, TextInput, Image } from "react-native";
import { Dimensions } from "react-native";

import { Colors } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

const deviceWidth = Dimensions.get("window").width;
let src = "";
let width = 0;
const SearchBar = ({ value, onUpdateValue, school, autoFocus, onSubmitEditing }) => {
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
	// width: src === "" ? deviceWidth* 0.65 : 
	return (
		<View
			style={[
				styles.container,
				{ width: src === "" ? deviceWidth * 0.65 : deviceWidth * 0.75},
				{ width: autoFocus ? deviceWidth * 0.75 : deviceWidth * 0.65}
			]}
		>
			<View
				style={[
					styles.input,
					{ width: src === "" ? deviceWidth * 0.65 : deviceWidth * 0.75 },
					{ width: autoFocus ? deviceWidth * 0.75 : deviceWidth * 0.65}
				]}
			>
				{src === "" ? null : <Image source={src} style={styles.image} />}
				<TextInput
					style={styles.textInput}
					onChangeText={onUpdateValue}
					value={value}
					autoFocus={autoFocus}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
			<View style={styles.icon}>
				<Feather name="search" size={24} color={Colors.blue} />
			</View>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 15,
		height: 40,
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		borderRadius: 30,
	},
	image: {
		width: deviceWidth * 0.07,
		height: deviceWidth * 0.07,
		borderRadius: deviceWidth * 0.5,
		marginRight: 5,
	},
	input: {
		backgroundColor: "#FFFFFF",
		flexDirection: "row",
	},
	textInput:{

	},
	icon: {},
});
