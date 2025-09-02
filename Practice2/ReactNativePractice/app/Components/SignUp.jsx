import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
function SignUp() {
    const[name,setName]=useState('');
    const[id,setID]=useState('');
    const[email,setEmail]=useState('');
    const[Visible,setVisible]=useState(false)

    function handleSubmit(){
        setVisible(true);

    }
    function handleReset(){
        setVisible(false);
    }

  return (
    <View style={Styles.mainContainer}>
        <View style={Styles.formContainer}>
            <Text style={Styles.heading}>SingUp Here</Text>
          <Image source={require('./1.jpg')} style={Styles.Image} />
            <Text style={Styles.textLabel}>Name:</Text>
            <TextInput style={Styles.inputFields}  placeholder='Enter Your Name' onChangeText={(value)=>{setName(value)}}/>

            <Text style={Styles.textLabel}>ID:</Text>
            <TextInput style={Styles.inputFields}  placeholder='Enter Your ID' onChangeText={(value)=>{setID(value)}}/>

            <Text style={Styles.textLabel} >Address:</Text>
            <TextInput style={Styles.inputFields}  placeholder='Enter Your Email' onChangeText={(value)=>{setEmail(value)}}/>
            
        </View>
        <View style={Styles.buttonsContainer}>
            <View style={Styles.button}>
            <Button title="Submit"  onPress={handleSubmit}/>
        </View>
        <View style={Styles.button}>
            <Button title="Reset"  onPress={handleReset}/>
        </View>
        </View>
        {Visible && (<View style={Styles.display}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Details:</Text>
            <Text>{name}</Text>
            <Text>{id}</Text>
            <Text>{email}</Text></View>)}

        
        
    </View>
  )
}

const Styles=StyleSheet.create({
    mainContainer:{
        flex:1
    },
    heading:{
        textAlign:'center',
        marginLeft:50,
        fontSize:25,
        fontWeight:'bold'
        
    },
    textLabel:{
        marginLeft:5,
        fontWeight:'bold'
    },
    formContainer:{
        margin:10
        
    },
    inputFields:{
        backgroundColor:'white',
        width:340
    },
    button:{
        width:150,
        margin:5
        
    },
    Image:{
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        height:200,
        width:350,
        marginLeft:-2
    },
    buttonsContainer:{
        flex:2,
        margin:15,
        width:320,
        flexDirection:'row'
    },
    display:{
        flex:3,
        margin:20,
        width:320,
        height:200,
        marginTop:-60,
        
    }

})

export default SignUp
