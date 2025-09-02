import { StyleSheet, View } from "react-native";
import SignUp from './Components/SignUp';
export default function Index() {
  return (
    <View style={Styles.div}>
      <SignUp/>
      
    </View>
  );
  
}
const Styles=StyleSheet.create({
    div:{
      height:200,
      width:300,
      flex:1
    }

  })
