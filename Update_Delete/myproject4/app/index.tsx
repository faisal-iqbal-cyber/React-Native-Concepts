import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, TextInput, View } from "react-native";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
export default function Index() {
  const Stack = createNativeStackNavigator();
  function HeaderTitle(){
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <Image
        style = {{height : 50,width:50}}
        source={{uri : 'https://marketplace.canva.com/EAGR4J_-jYM/2/0/1600w/canva-colorful-abstract-online-shop-free-logo-zxo07UzxTDw.jpg'}} />
        <Text > My Application</Text>
      </View>
    )
  }
  function HeaderRight(){
    return(
      <View>
        <TextInput style={{backgroundColor:"white"}} placeholder="Search Here.."/>
      </View>
    )
  }
  return (
   <Stack.Navigator screenOptions={
    {
      
      headerStyle : {
        backgroundColor: "orange"
      },
      headerTintColor : "blue",
      headerTitleStyle : {
        fontWeight : "bold"
      },
      headerTitle : () => <HeaderTitle />,
      headerRight : () => <HeaderRight />,

    }
   }>
    <Stack.Screen name="Home" component={Login}/>
    <Stack.Screen name="Signup" component={Signup}/>
    <Stack.Screen name="Dashboard" component={Dashboard}/>

   </Stack.Navigator>
  );
}
