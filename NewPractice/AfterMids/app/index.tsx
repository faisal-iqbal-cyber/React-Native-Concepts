import { Text, View } from "react-native";
import CreateProduct from "./Components/CreateProduct";
import ViewProducts from './Components/ViewProducts'
import UpdateProduct from './Components/UpdateProduct'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from './Components/SignUp'
export default function Index() {
  const Stack=createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ViewProducts" component={ViewProducts} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
      </Stack.Navigator>
  );
}
