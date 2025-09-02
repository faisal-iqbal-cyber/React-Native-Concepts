import { Text, View ,TouchableOpacity,Button} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from './Login'

function MainMenu() {
    const Stack=createBottomTabNavigator();
      function handleLogin(){

      }
      function Home(){
        return(
            <View>
                <Text>This is HOme of Main Menu</Text>
            </View>
        )
      }
      function Home1(){
        return(
            <View>
                <Text>This is HOme of Main Menu Home 1</Text>
            </View>
        )
      }
      function Home2(){
        return(
            <View>
                <Text>This is HOme of Main Menu Home2</Text>
            </View>
        )
      }
  return (
    <Stack.Navigator>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Home1" component={Home1} />
         <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  
  )
}

export default MainMenu