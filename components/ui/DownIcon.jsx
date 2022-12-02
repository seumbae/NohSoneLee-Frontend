import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';

const DownIcon = ({size, style}) => {
  return (
    <FontAwesome name="sort-down" size={size} color={Colors.font600} />
  )
}

export default DownIcon;