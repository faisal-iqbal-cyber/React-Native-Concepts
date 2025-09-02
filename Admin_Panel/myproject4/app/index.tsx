import { Text, View ,Image,TextInput} from "react-native";
import Header from "./components/Header";
import Signup from './components/Signup';
import List from './components/List';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
export default function Index() {
  const Stack = createNativeStackNavigator();
  function HeaderTitle(){
    return(
      <View style={{flex:1,flexDirection:'row'}}>
        <Image style={{height:50, width:50}}source={{uri:'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg'}}/>
        <Text style={{fontSize:22, fontWeight:'bold'}}>Store </Text>
      </View>
    )
  }
  function HeaderRight() {
    return (
      <View>
        <TextInput style={{backgroundColor:'black', color: 'white', padding: 5, marginRight:16}} placeholder="Search Here" placeholderTextColor="gray"/>
      </View>
    );
  }
  return (
   <Stack.Navigator screenOptions={
    {
      title:"My Application",
      headerStyle:{
      backgroundColor:"orange"
      },
      headerTintColor:"blue",
      headerTitle: ()=> <HeaderTitle/>,
      headerRight: ()=> <HeaderRight/>
    }
   }>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Home" component={Signup}/>
    <Stack.Screen name="ProductsList" component={List}/>
    <Stack.Screen name="Header" component={Header}/>
    <Stack.Screen name="Dashboard" component={Dashboard}/>

   </Stack.Navigator>
  );
}
