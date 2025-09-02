
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
   
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => navigation.goBack(), 
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
        
            Alert.alert(
              'Logged Out',
              'You have been logged out successfully.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'WelcomeScreen' }],
                    });
                  },
                },
              ],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  return null; 
};

export default Logout;
