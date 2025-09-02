import { useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, TextInput, View } from "react-native";


function Login({navigation}){
    const [name,setName] = useState('');
    const [contact,setContact] = useState('');
    const [address,setAddress] = useState('');
    const [isVisible,setIsVisible] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);

function submitHandler(){
 navigation.navigate("Dashboard");
   
}
function resetHandler(){
    navigation.navigate("Signup");
 
   
}
    return(
        <View style={styles.container}>
            <Modal animationType="slide" visible={modalVisible} transparent={true} onRequestClose={()=>setModalVisible(false)}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>User Registered Successfully</Text>
                    <Button title="Close" onPress={()=>setModalVisible(false)} />
                </View>
                </View>
            </Modal>

       <Image style={{alignSelf:'center'}} source={require('../../assets/images/react-logo.png')}></Image>

            <Text style={styles.text}>Login</Text>
            <View style={styles.formContainer}>
                <TextInput style = {styles.inputFields} onChangeText={(value)=>{setName(value)}} placeholder="Enter Email" />
                <TextInput style = {styles.inputFields} onChangeText={(value)=>{setContact(value)}} placeholder="Enter Password" keyboardType="numeric"/>
           
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
                <Button title="Login" onPress={submitHandler}/>
                </View>
                <View  style={styles.buttons}>
                <Button title="Signup" onPress={resetHandler} />
                </View>
            </View>
            <View style={styles.statesContainer}>
                {isVisible && <View><Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>{contact}</Text>
                <Text style={styles.text}>{address}</Text></View>}
                
            </View>
        </View>
    );
}
export default Login;
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