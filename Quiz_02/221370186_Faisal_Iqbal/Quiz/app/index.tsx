import { Text, View ,TouchableOpacity,Button} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from './Components/Login'
import MainMenu from './Components/MainMenu'
export default function Index() {
  const Stack =createDrawerNavigator();
  function HeaderTitle(){
    return(
      <View>
          <Text style={{textAlign:'center',fontWeight:'bold',fontSize:25, color:'red'}}>KFC</Text>
      </View>
    )
  }
  function HeaderRight(){
    return(
      <View style={{marginLeft:150}}>
          <Button title="Login" onPress={handleLogin}/>
      </View>
    )
  }
  function handleLogin(){
    // navigation.navigate('Login')
  }
  function Home(){
    return(
      <View>
          <Text>This is MY Home Screen </Text>
      </View>
    )
  }
  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle:{
        backgroundColor:'gray'
      },
      headerTintColor:'orange',
      headerBackTitleStyle:{
        fontSize:20
      },
      headerRight:()=><HeaderRight/>,
      headerTitle:()=><HeaderTitle/>
    }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainMenu" component={MainMenu} />


    </Stack.Navigator>
  );
}
