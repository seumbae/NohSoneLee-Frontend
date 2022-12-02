import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	FlatList,
	Image,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";

const deviceWidth = Dimensions.get("window").width;

const Lists = ({ item, index }) => {
  const navigation = useNavigation();

  const schoolList = [
		"세종대학교",
		"연세대학교",
		"서울과학기술대학교",
		"고려대학교",
		"국민대학교",
		"건국대학교",
		"홍익대학교",
		"동국대학교",
	];

  const onPressHandler = (index) => {
		navigation.navigate('SchoolScreen', { school: schoolList[index] });
	};

  return (
    <Pressable onPress={() => onPressHandler(index)}>
      <Image source={item} key={index} style={styles.image} />
    </Pressable>
  )
}

const SchoolLogoList = () => {

  const [schoolImages, setSchoolImages] = useState([
		require("../assets/school/sejong.png"),
		require("../assets/school/yonsei.png"),
		require("../assets/school/science_technology.png"),
		require("../assets/school/korea.png"),
		require("../assets/school/kookmin.png"),
		require("../assets/school/konkuk.png"),
		require("../assets/school/hongik.png"),
		require("../assets/school/dongguk.png"),
	]);

  const renderItem = ({ item, index }) => <Lists item={item} index={index} />;

	return (
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={schoolImages}
			renderItem={renderItem}
				// <Pressable onPress={onPressHandler(index)}>
				// 	<Image source={item} key={index} style={styles.image} />
				// </Pressable>
		/>
	);
};

export default SchoolLogoList;

const styles = StyleSheet.create({
	image: {
		width: deviceWidth * 0.2,
		height: deviceWidth * 0.2,
		marginRight: 5,
	},
});
