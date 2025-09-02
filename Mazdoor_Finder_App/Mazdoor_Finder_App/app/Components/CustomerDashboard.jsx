import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomerHome from './CustomerHome';
import EditCustomerProfile from './EditCustomerProfile';
import Logout from './Logout';

const Drawer = createDrawerNavigator();

export default function CustomerDashboard({ route }) {
  const { userID  , role } = route.params;

  console.log('CustomerDashboard params:', userID , role); 
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.logoMini}>Asaan</Text>
            <Text style={styles.logoMain}>Kaam</Text>
          </View>
        ),
        drawerActiveTintColor: '#4CAF50',
        drawerLabelStyle: { fontSize: 16 },
        headerTintColor: '#000',
      }}
    >
      <Drawer.Screen name="Home" component={CustomerHome} initialParams={{ userID  , role}}/>
      <Drawer.Screen name="Edit Profile" component={EditCustomerProfile} initialParams={{ userID }}/>
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMini: {
    fontSize: 16,
    color: '#333',
    marginRight: -5.5,
    marginTop: 8,
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});