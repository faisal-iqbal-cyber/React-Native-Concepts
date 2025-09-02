import React from 'react'
import { Text, View } from "react-native";
function NewComponent3(props) {
  return (
    <View>
    <Text>Third Component Output</Text>
    <Text>{props.name}</Text>
    <Text>{props.age}</Text>
    <Text>{props.gender}</Text>

    </View>
   
  )
}

export default NewComponent3