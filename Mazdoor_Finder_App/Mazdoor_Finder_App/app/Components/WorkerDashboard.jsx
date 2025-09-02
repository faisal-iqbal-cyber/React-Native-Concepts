import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DashboardScreen from './DashboardScreen';
import EditMazdoor from './EditMazdoor';
import GetInTouch from './GetInTouch';
import Logout from './Logout';

const Drawer = createDrawerNavigator();

const WorkerDashboard = ({ route }) => {
  const { mazdoorID  , role} = route.params;
  console.log('WorkerDashboard params:', route.params); 
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
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ mazdoorID: mazdoorID }}
      />
      <Drawer.Screen
        name="EditMazdoor"
        component={EditMazdoor}
        initialParams={{ mazdoorID: mazdoorID }}
      />
      <Drawer.Screen name="GetinTouch" component={GetInTouch} initialParams={{ userID: mazdoorID  , role : role}} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default WorkerDashboard;

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  logoMini: {
    fontSize: 12,
    color: '#333',
    marginTop: 10,
  },
  logoMain: {
    fontSize: 30,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});