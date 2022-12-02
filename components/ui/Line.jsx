import {View, StyleSheet} from 'react-native';
const Line = ({color}) => {
  return <View style={[styles.line, {backgroundColor: color}]}/>
}

export default Line;

const styles = StyleSheet.create({
  line:{
    width: 50,
    height: 1.5,
  },
});