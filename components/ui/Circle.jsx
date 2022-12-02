import {View, StyleSheet} from 'react-native';
const Circle = ({color}) => {
  return <View style={[styles.circle, {backgroundColor: color}]}/>
}

export default Circle;

const styles = StyleSheet.create({
  circle:{
    width: 10, 
    height: 10,
    borderRadius: 5,
  },
});