import { Text, View } from "react-native";
function NewCompnenet(props) {
  return (
    <View>
        
        <Text>First Component Output</Text>
        <Text>{props.name}</Text>
    </View>
  )
}

export default NewCompnenet