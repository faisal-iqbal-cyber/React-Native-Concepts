import { Text, View } from "react-native";
function NewComponent2(props) {
  return (
    <View>
        
        <Text>2nd Component Output</Text>
        <Text>{props.name}</Text>
        <Text>{props.age}</Text>
        <Text>{props.gender}</Text>
    </View>
    
  )
}

export default NewComponent2