import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from './components/Header';
import List from './components/List';
import Signup from './components/Signup';
export default function Index() {
  const Stack=createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Signup}/>
      <Stack.Screen name="ProductList" component={List}/>
      <Stack.Screen name="Header" component={Header}/>
    </Stack.Navigator>
    // <View style={{flex:1}}>
    //   <List/> 
    //   {/* <Signup/> */}

    // </View>
  );
}
