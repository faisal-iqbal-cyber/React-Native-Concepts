import React from 'react';
import { FlatList, Text, View } from 'react-native';

function ProductList() {
    const products=[
        {
            id:'1',
            name:'Car',
            price:'320000'
        },
        {
            id:'2',
            name:'Bike',
            price:'64894'
        },
        {
            id:'3',
            name:'Truck',
            price:'25436'
        }
    ]
    function Item(props){
        return(
            <View style={{ backgroundColor: 'gray', padding: 30, margin: 10, borderColor: 'blue', borderWidth: 2 }}>
                <Text>{props.name}</Text>
                <Text>{props.price}</Text>
                <Button title="Update"/>
            </View>
        )
    }
  return (
    <View>
        <FlatList data={products} keyExtractor={item=>item.id} renderItem={({item})=><Item name={item.name} price={item.price}/> }/>
    </View>
  )
}

export default ProductList