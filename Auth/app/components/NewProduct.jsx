import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";


function NewProduct({navigation}){
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');

function submitHandler(){
    fetch('https://my-application-4b743-default-rtdb.firebaseio.com/Products.json', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: name,
    price: price,
    description : description
  }),
});
   
}

    return(
        <View style={styles.container}>
          
            <Text style={styles.text}>Create New Product</Text>
            <View style={styles.formContainer}>
                <TextInput style = {styles.inputFields} onChangeText={(value)=>{setName(value)}} placeholder="Enter Name" />
                <TextInput style = {styles.inputFields} onChangeText={(value)=>{setPrice(value)}} placeholder="Enter Price" keyboardType="numeric"/>
                <TextInput style = {styles.inputFields} onChangeText={(value)=>{setDescription(value)}} placeholder="Enter Description" />
           
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
                <Button title="Create" onPress={submitHandler}/>
                </View>
              
            </View>
          
        </View>
    );
}
export default NewProduct;
const styles = StyleSheet.create({
    container : {
        padding : 24,
        flex:1,
    },
    registerImage : {
    justifyContent : 'center',
    alignItems : 'center',
    alignSelf : 'center'
    },
    text : {
        fontSize : 22,
        fontWeight : 'bold',
        textAlign : 'center',

    },
    formContainer : {
        flex :3,

    },
    buttonsContainer: {
        flex : 1,
        flexDirection : 'row',

    },
    statesContainer : {
        flex :1,
        padding : 25,

    },
    inputFields : {
        borderWidth : 2,
        height : 40,
        margin : 10,
        backgroundColor : 'white'


    },
    buttons : {
        flex : 2,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

});