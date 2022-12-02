import { View, Dimensions } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';


const deviceWidth = Dimensions.get("window").width;

const Logo = () => {
	return (
		<View>
      <AutoHeightImage width={deviceWidth*0.25} source={require("../../assets/logo.png")} />
		</View>
	);
};

export default Logo;
