
import { Button, FlatList, StyleSheet, Text, View } from "react-native";


function List({navigation,route}){
    function submitUpdate(){
        navigation.navigate('Header')
    }

    const products = [
        {
            id : "1",
            name : "desktop",
            price : "32000"
        },
        {
            id : "2",
            name : "keyboard",
            price : "32000"
        },
        {
            id : "3",
            name : "mouse",
            price : "32000"
        },
        {
            id : "4",
            name : "speaker",
            price : "32000"
        },
    ]
    function Item(props){
        return(
            <View style={styles.item}>
                <Text>
                    {props.title}
                </Text>
                <Text>
                    {props.price}
                </Text>
                <Button title = "Update" onPress={submitUpdate}/>
                <Text>{route.params.id}</Text>
                <Text>{route.params.name}</Text>

            </View>
        )
    }
    return (
        <View>
           
            <FlatList data={products} keyExtractor={item=>item.id} 
            renderItem={({item}) => <Item title={item.name} price={item.price} />} />

        </View>
    )
}
const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      height:150,
    }

  });
export default List;