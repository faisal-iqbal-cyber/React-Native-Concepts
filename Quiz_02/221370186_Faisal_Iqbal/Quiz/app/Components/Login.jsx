import React from 'react'
import {Text,View,TextInput,Button} from 'react-native'
function Login({navigation,route}) {
    function HandleLogin(){
        navigation.navigate('Home')
    }
  return (
   <View>
        <View>
            <Text style={{fontSize:25,fontWeight:'bold', textAlign:'center'}}>Welcome</Text>

        </View>
        <View>
            <Text>Phone Number</Text>
        </View>
        <View>
            <TextInput style={{backgroundColor:'gray'}}placeholder='+92 '/>

        </View>
        <View>
            <Button title='Login' onPress={HandleLogin}/>

        </View>
   </View>
  )
}

export default Login