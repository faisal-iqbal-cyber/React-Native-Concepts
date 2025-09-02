import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

function List({ navigation, route }) {
  const [products, setProducts] = useState([]);

  function Item(props) {
    return (
      <View style={styles.item}>
        <Text style={{color:'black'}}>{props.title}</Text>
        <Text>{props.price}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button title="Update" />
          <Button
            title="Delete"
            onPress={() => deleteProduct(props.id)} // ✅ FIXED: pass a function
          />
        </View>
      </View>
    );
  }

  function deleteProduct(id) {
    console.log("Delete product with id:", id);
    // Example: remove locally
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );

    // ✅ If you want to delete from Firebase too:
    // fetch(`https://my-application-e9dd1-default-rtdb.firebaseio.com/products/${id}.json`, {
    //   method: "DELETE",
    // });
  }

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://my-application-e9dd1-default-rtdb.firebaseio.com/Products.json"
      );
      const data = await response.json();

      const tempArray = [];
      for (const key in data) {
        const productData = {
          id: key, // ✅ CORRECT key as id
          name: data[key].name,
          price: data[key].price,
        };
        tempArray.push(productData);
      }

      console.log("Fetched products:", tempArray);
      setProducts(tempArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts(); // ✅ Fetch once on mount
  }, []); // ✅ FIXED: no infinite loop!

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id} // ✅ Unique keys!
        renderItem={({ item }) => (
          <Item title={item.name} price={item.price} id={item.id} />
        )}
      />
    </View>
  );
}

function ProductsList() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="general" component={List} />
      <BottomTab.Screen name="general1" component={List} />
      <BottomTab.Screen name="general2" component={List} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ProductsList;
