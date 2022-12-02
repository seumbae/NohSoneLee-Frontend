import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../constants/styles";

const PreviousButton = ({onPress}) => {
	return (
		  <View style={styles.container}>
		  	<MaterialIcons name="arrow-back-ios" size={24} color={Colors.blue} style={{marginLeft: 8}} onPress={onPress}/>
		  </View>
	);
};

export default PreviousButton;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  }
  
})