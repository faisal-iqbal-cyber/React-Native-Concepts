import { Text, View } from "react-native";
import SignUp from './Components/SignUp'
import ProductList from './Components/ProductList'
import Login from './Components/Login'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator}from "@react-navigation/material-top-tabs"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminDashboard from './Components/AdminDashboard'
import CreateProduct from './Components/CreateProduct'
import update from './Components/update'
export default function Index() {

  const Stack=createDrawerNavigator();
  function HeaderTitle(){
    return(
      <View>
          <Text>This is Amazing Good !!</Text>
      </View>
      
    )
  }
  return (
    // <View style={{flex:1}}>
    //   {/* <SignUp/> */}
    //   {/* <ProductList/> */}
    //   <Login/>
      
    // </View>
    // <Stack.Navigator screenOptions={{
    //   title:"My Application",
    //   headerStyle:{
    //     backgroundColor:'orange'
    //   },
    //   headerTintColor:'blue',
    //   headerTitle:()=><HeaderTitle/>
    // }}>
    <Stack.Navigator>
      <Stack.Screen name="Admin Dashboard" component={AdminDashboard}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="ProductList" component={ProductList}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="CreateProduct" component={CreateProduct}/>
      <Stack.Screen name="update" component={update}/>

    </Stack.Navigator>
  );
}
