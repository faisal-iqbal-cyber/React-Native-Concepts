import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Header from './Header';
import ProductsList from './List';
import NewProduct from './NewProduct';


function AdminHome(){
    return(
        <View>
            <Text>Welcome to Admin Dashboard</Text>
        </View>
    )
}

function Dashboard(){
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="AdminHome" component={AdminHome} />
            <Drawer.Screen name="ProductsList" component={ProductsList} />
            <Drawer.Screen name="Users" component={Header} />
            <Drawer.Screen name="NewProduct" component={NewProduct} />
        </Drawer.Navigator>
      
    )
}
export default Dashboard;