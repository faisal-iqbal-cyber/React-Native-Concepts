import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";


function List({navigation,route}){
    const [products,setProducts]=useState([]);
    function Item(props){
        return(
            <View style={styles.item}>
               
                <Text>
                    {props.title}
                </Text>
                <Text>
                    {props.price}
                </Text>
                <Text>
                    {props.description}
                </Text>
                <View>
                <View>
                    <Button title = "Update"/>
                    </View>
                    <View>
                    <Button title = "Delete" onPress={deleteProduct(props.id)}/>
                </View>

                </View>
                
                


            </View>
        )
    }
    function deleteProduct(id){

    }
    //data fetching require code
    async function fetchProducts(){
        const response=await fetch('https://my-application-4b743-default-rtdb.firebaseio.com/product.json')
        const data=await response.json();
        const tempArray=[];
        for(const key in data){
            const productData={
                id:data[key],
                name:data[key].name,
                price:data[key].price,
                description:data[key].description

            }
            tempArray.push(productData);
        }
        setProducts(tempArray);
    }
    useEffect(()=>{
        fetchProducts();//will execute when change occur
    },[products])//dependency variable
    return (
        <View>
            {/* <Button title="Get Products" onPress={fetchProducts}/> */}
            <FlatList data={products} keyExtractor={item=>item.id} 
            renderItem={({item}) => <Item title={item.name} price={item.price} description={item.description} id={item.id} />} />

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
    }

  });
export default ProductsList;