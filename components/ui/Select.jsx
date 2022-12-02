import { StyleSheet } from "react-native";

import { CATEGORIES } from "../../data/university";
import DropDownPicker  from "react-native-dropdown-picker";
import { useEffect, useState } from "react";

export const Select = ({ setSchoolId, setTopic }) => {
	// const univ = CATEGORIES.map((item) => {
	// 	return { lable: item.id, value: item.school };
	// });
  const [univ, setUniv] = useState([]);
  useEffect(()=>{
    setUniv(CATEGORIES.map((item) => {
      return { label: item.school, value: item.id};
    }));
  },[])
	const [topic, setTopic1] = useState([
		{ label: '동아리', value: "동아리" },
		{ label: '공모전', value: "공모전" },
		{ label: '편입', value: "편입" },
    { label: '학과', value: "학과" },
    { label: '학생회', value: "학생회" },
    { label: '대외활동', value: "대외활동" },
    { label: '장학금', value: "장학금" },
	]);
	const isUniv = setSchoolId ?? false;
	const isTopic = setTopic ?? false;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

	if (isUniv) {
		return (
			<DropDownPicker
        open={open}
				items={univ}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setUniv}
        onSelectItem={(item) => setSchoolId(item.value)}
				placeholder="학교"
				style={styles.boxStyle}
        textStyle={{marginLeft: 10}}
				dropDownContainerStyle={styles.dropdownStyle}
        zIndex={6000}
			/>
		);
	}
	if (isTopic) {
		return (
			<DropDownPicker
				open={open}
				items={topic}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setTopic1}
        onSelectItem={(item) => setTopic(item.value)}
				placeholder="토픽"
				style={styles.boxStyle}
        textStyle={{marginLeft: 10}}
				dropDownContainerStyle={styles.dropdownStyle}
			/>
		);
	}
};

const styles = StyleSheet.create({
	boxStyle: {
		backgroundColor: "#FFFFFF",
		width: 200,
		height: 40,
		borderRadius: 25,
		borderColor: "#FFFFFF",
		alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
	},
	dropdownStyle: {
		backgroundColor: "#FFFFFF",
		borderColor: "#FFFFFF",
		width: 200,
	},
  SelectWithComplete:{
    flexDirection: "row",
  },
});
