import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';

import CustomerDashboard from './Components/CustomerDashboard';
import ExperienceScreen from './Components/ExperienceScreen';
import Feedback from './Components/Feedback';
import ForgotPassword from './Components/ForgotPassword';
import GalleryView from './Components/GalleryView';
import HireScreen from './Components/HireScreen';
import LoginScreen from './Components/LoginScreen';
import MazdoorDetails from './Components/MazdoorDetails';
import MazdoorProfile from './Components/MazdoorProfile';
import RequestByCustomer from './Components/RequestsByCustomer';
import SignUpScreen from './Components/SignUpScreen';
import SkillsScreen from './Components/SkillsScreen';
import SplashScreen from './Components/SplashScreen';
import WelcomeScreen from './Components/WelcomeScreen';
import WorkerDashBoard from './Components/WorkerDashboard';

export default function Index() {
  const Stack = createNativeStackNavigator();
  return (

        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen  name = "SignUpScreen" component = {SignUpScreen}/>
          <Stack.Screen  name = "LoginScreen" component = {LoginScreen}/>
          <Stack.Screen  name = "ForgotPassword" component = {ForgotPassword}/>
          <Stack.Screen  name = "SkillsScreen" component = {SkillsScreen}/>
          <Stack.Screen  name = "ExperienceScreen" component = {ExperienceScreen}/>
          <Stack.Screen name="WorkerDashboard" component={WorkerDashBoard} /> 
          <Stack.Screen name="MazdoorDetails" component={MazdoorDetails} />
           <Stack.Screen name="GalleryView" component={GalleryView} />
           <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
          <Stack.Screen name="MazdoorProfile" component={MazdoorProfile} />
           <Stack.Screen  name = "HireScreen" component = {HireScreen}/>
          <Stack.Screen name="RequestByCustomer" component={RequestByCustomer} />
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
 
    
  );
}
