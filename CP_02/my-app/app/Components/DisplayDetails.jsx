import { Text, View,Button,TouchableOpacity,StyleSheet } from "react-native";
import React, { useState } from "react";

function DisplayDetails(props) {
    const [showDescription, setShowDescription] = useState(false);
    function handleSubmit(){
        setShowDescription(true)
    }
    
  return (
    <View>
        <Text style={{textAlign:'center', color:'white', backgroundColor:'black'}}>{props.name}</Text>
        <View>
            <Text>Name of Country is : {props.name}</Text>
            <Text>Capital is :{props.capital}</Text>
            {showDescription && (
                <Text>Description: {props.description}</Text>
                
            )}
            
           <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Click</Text>
        </TouchableOpacity>
        <Text>{'\n'}</Text>
            
            
        </View>
        
    </View>
  )
}

export default DisplayDetails
const styles = StyleSheet.create({
            button: {
                backgroundColor: 'black',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginTop: 10,
                alignItems: 'center',
                width: 150,
                height: 50,
                justifyContent: 'center',
                marginLeft:100
            },
            buttonText: {
                color: '#fff',
                fontSize: 10,
                
            },
            });
