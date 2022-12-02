import {View, TextInput, StyleSheet} from 'react-native';
import { Colors } from '../../constants/styles';

const Input = ({placeholder, handler, password}) => {
  return (
    <View style={[styles.inputContainer, {marginBottom:10}]}>
					<TextInput
						style={styles.input}
						onChangeText={(text) => handler(text)}
						placeholder={placeholder}
						placeholderTextColor={Colors.Grayicon}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						secureTextEntry={password}
						spellCheck={false}
						autoComplete={false}
						autoCorrect={false}
					/>
				</View>
  )  
}

export default Input;

const styles = StyleSheet.create({
	inputContainer:{
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 25,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderWidth: 1,
		borderColor: Colors.font400,
		backgroundColor: "#FFFFFF",
	},
	input: {
		backgroundColor: "#FFFFFF",
		paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
	},
});
