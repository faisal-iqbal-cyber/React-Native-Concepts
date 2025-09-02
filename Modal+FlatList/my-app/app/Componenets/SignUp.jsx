import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";


function SignUp() {
    const[name,setName]=useState('');
    const[contact,setContact]=useState('');
    const[address,setAddress]=useState('');
    const[isVisible,setIsVisible]=useState(false);
    function submitHandler(){
        setIsVisible(true);
        // setName("Ali");
        // setContact("12345");
        // setAddress("Gujranwala");

    }
    function resetHandler(){
        setIsVisible(false);
    }
  return (
    <View style={Styles.container}>
            <Image source={require('../../assets/images/react-logo.png')}></Image>
        <Text style={Styles.text}>SignUp Here</Text>
        <View style={Styles.formContainer}>
            <Text style={Styles.labels}>Name:</Text>
            <TextInput style = {Styles.inputFields} placeholder="Enter Name"  onChangeText={(value) => setName(value)}/>
            <Text style={Styles.labels}>Contact:</Text>
            <TextInput style={Styles.inputFields} placeholder="Enter Contact" keyboardType='numeric'  onChangeText={(value)=>setContact(value)}/>
            <Text style={Styles.labels}>Address:</Text>
            <TextInput style={Styles.inputFields} placeholder="Enter Address" keyboardType='email-address'  onChangeText={(value)=>setAddress(value)}/>
        </View>
        <View style={Styles.buttonContainer}>
            <View style={{flex:2}}>
                <Button title="Submit" onPress={submitHandler} ></Button>
            </View>
           <View style={{flex:2}}>
                <Button title="Cancel" onPress={resetHandler} ></Button>
           </View>
           
           
           {/* <View style={{flex:2}}>
                <Pressable>
                    <Text>Cancel</Text>
                </Pressable>
           </View>
           <View style={{flex:2}}>
                <TouchableOpacity>
                    <Text>Cancel</Text>
                </TouchableOpacity>
           </View> */}
            

        </View>
        <View style={Styles.states}>
            {isVisible==true && <View><Text>{name}</Text>
                <Text>{contact}</Text>
                <Text>{address}</Text></View>}
                
           </View>

    </View>
  )
}

export default SignUp
const Styles=StyleSheet.create(
    {
        container:{
            padding:20,
            backgroundColor:"white",
            flex:1
           
        },
        text:{
            fontSize: 26,
            fontWeight:'bold',
            textAlign:'center',
            color:'black'
        },
        formContainer:{
            flex:4,
            backgroundColor:'white',
            borderRadius:'2%'
        },
        buttonContainer:{
            flex:1,
            flexDirection:'row',
            backgroundColor:'white'
        },
        inputFields:{
            borderWidth: 2,
            height:40,
            backgroundColor:'white',
            margin: 10
        },
        labels:{
            marginLeft:15
        },
        states:{
            flex:2,
            backgroundColor:'white'
        }


    });