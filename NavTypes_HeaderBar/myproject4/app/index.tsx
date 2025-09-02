import { Text, View ,Image} from "react-native";
import Header from "./components/Header";
import Signup from './components/Signup';
import List from './components/List';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
export default function Index() {
  const Stack = createDrawerNavigator();
  function HeaderTitle(){
    return(
      <View style={{flex:1,flexDirection:'row'}}>
        <Image style={{height:50, width:50}}source={{uri:'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg'}}/>
        <Text style={{fontSize:22, fontWeight:'bold'}}>Store </Text>
      </View>
    )
  }
  return (
   <Stack.Navigator screenOptions={
    {
      title:"My Application",
      headerStyle:{
      backgroundColor:"orange"
      },
      headerTintColor:"blue",
      headerTitle:()=><HeaderTitle/>
    }
   }>
    <Stack.Screen name="Home" component={Signup}/>
    <Stack.Screen name="ProductsList" component={List}/>
    <Stack.Screen name="Header" component={Header}/>
   </Stack.Navigator>
  );
}
