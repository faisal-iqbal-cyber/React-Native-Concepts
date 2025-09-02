
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";


function List({navigation,route}){
    const [products,setProducts] = useState([]);
    const [isvisible,setIsvisible] = useState(false);
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [selectedProduct,setSelectedProduct] = useState('');

    function Item(props){
        return(
            <View style={styles.item}>
               
                <Text>
                    {props.title}
                </Text>
                <Text>
                    {props.price}
                </Text>
                <View style={{padding:5}}>
                <Button title = "Update" onPress={()=>openModal(props)}/>
                <Button title = "Delete" onPress={()=>deleteProduct(props.id)}/>
                </View>

            </View>
        )
    }
    function openModal(values){
        setSelectedProduct(values);
        setName(values.title);
        setPrice(values.price);
        setDescription(values.description);
        setIsvisible(true);
       
    }
    function deleteProduct(id){
          //  fetch(`https://my-dfsdf-erwe-45-default-rtdb.firebaseio.com/Products/${id}.json`, {
       
        fetch(`use your own db url here`, {
            method: 'DELETE',
          });

    }

    async function fetchProducts(){
      //  const response = await fetch('https://rer-tesat-eew-9d647-default-rtdb.firebaseio.com/Products.json');
        const response = await fetch('use your own real time db here');
        const data = await response.json();
        const productsArray = [];
        for(const key in data){
            const productData ={
                id : key,
                name : data[key].name,
                price : data[key].price,
                description : data[key].description
            }
            productsArray.push(productData);
        }
        setProducts(productsArray);
    }

    useEffect(()=>{
        fetchProducts();
    },[products]);
    function handleUpdate(){
        const id = selectedProduct.id;
      //  fetch(`https://my-dfsdf-erwe-45-default-rtdb.firebaseio.com/Products/${id}.json`, {
        
        fetch(`use your own db url here`, {
            method: 'PUT',
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

    return (
        <View>
                  
            <FlatList data={products} keyExtractor={item=>item.id} 
            renderItem={({item}) => <Item title={item.name} price={item.price} description={item.description} id={item.id} />} />
            <Modal style={styles.centeredView} animationType="slide" visible={isvisible}>
            <View style={styles.modalView}>
          
                <Text style={styles.text}>Update Product</Text>
                <View style={styles.formContainer}>
                    <TextInput value={name} style = {styles.inputFields} onChangeText={(value)=>{setName(value)}} placeholder="Enter Name" />
                    <TextInput value={price} style = {styles.inputFields} onChangeText={(value)=>{setPrice(value)}} placeholder="Enter Price" keyboardType="numeric"/>
                    <TextInput value={description} style = {styles.inputFields} onChangeText={(value)=>{setDescription(value)}} placeholder="Enter Description" />
                
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttons}>
                    <Button title="Update" onPress={handleUpdate}/>
                    <Button title="Close" onPress={()=>setIsvisible(false)}/>
                    </View>
                    
                </View>
                </View>


            </Modal>

        </View>
    )
}

function ProductsList(){
    const BottomTab = createBottomTabNavigator();
    return(
        <BottomTab.Navigator screenOptions={{
            headerShown : false
        }}>
            <BottomTab.Screen name="general" component={List} />
            <BottomTab.Screen name="general1" component={List} />
            <BottomTab.Screen name="genera2" component={List} />

        </BottomTab.Navigator>
    )
}


const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
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
export default ProductsList;