import { View, Text } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "./Header";
import Signup from './Signup';
import List from './List';

function AdminHome({ route }) {
  return (
    <View>
      <Text>Welcome to Admin Dashboard</Text>
      <Text>Name: {route.params.name }</Text>
      <Text>Email: {route.params.email}</Text>
    </View>
  );
}

function HeaderTitle() {
  return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dashboard</Text>;
}

function HeaderRight() {
  return <Text style={{ paddingRight: 10 }}>Settings</Text>;
}

const Drawer = createDrawerNavigator();

function Dashboard({ route }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "orange"
        },
        headerTintColor: "blue",
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight />
      }}
    >
      <Drawer.Screen name="AdminHome" component={AdminHome} initialParams={{ name: route.params.name, email: route.params.email }}/>
      <Drawer.Screen name="products" component={List} />
      <Drawer.Screen name="user" component={Header} />
    </Drawer.Navigator>
  );
}

export default Dashboard;
