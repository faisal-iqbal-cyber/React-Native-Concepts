import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
function Signup(){
    const [name,setName] = useState('');
    const [contact,setContact] = useState(0);
    const [address,setAddress] = useState('');
    const [isVisible,setIsVisible] = useState(false);

    function submitHandler(){
      setIsVisible(true);
    }
    function resetHandler(){
        setIsVisible(false);
      }

    return(
        <View style={style.container}>
            <Text style={style.text}>Sign up Form</Text>
            <View style = {style.form}>
                <TextInput style = {style.inputFields} onChangeText={(value)=>{setName(value)}} placeholder='Enter Name'/>
                <TextInput style = {style.inputFields} onChangeText={(value) => {setContact(value)}} placeholder='Enter Contact'/>
                <TextInput style = {style.inputFields} onChangeText={(value) => {setAddress(value)}} placeholder='Enter Address'/>
        
            </View>
            <View style = {style.buttons}>
                <View style={style.buttonTags}>
                <Button  title='Submit' onPress={submitHandler} />
                </View>
                <View style={style.buttonTags}>
                <Button title='Reset' onPress={resetHandler}/>
                </View>         
            </View>
            <View style={style.states}>
                <Text>{name}</Text>
                <Text>{address}</Text>
                {isVisible && <View>
                <Text>{contact}</Text>
                </View>}
                
            </View>
        </View>

    );  
}
const style = StyleSheet.create({
container :{
    flex : 1,
    padding: 24,

},
text : {
textAlign : 'center',
fontWeight : 'bold',
fontSize : 26,
},
form :{
 flex : 3,

},
buttons : {
    flex : 1,
    flexDirection: 'row',
 

},
states : {
    flex : 2,
},
buttonTags : {
    flex : 2,
},
inputFields : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
}

});
export default Signup;