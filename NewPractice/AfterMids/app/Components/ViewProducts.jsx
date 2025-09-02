import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";

function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://my-application-e9dd1-default-rtdb.firebaseio.com/Product.json"
      );
      const data = await response.json();

      if (!data) {
        setError("No data found in the database");
        setProducts([]);
        return;
      }

      const tempArray = [];
      for (const key in data) {
        tempArray.push({
          id: key,
          name: data[key].product_name,
          price: data[key].product_price,
          description: data[key].product_description,
        });
      }
      setProducts(tempArray);
    } catch (error) {
      setError("Failed to fetch products");
    }
  }

  async function deleteProduct(id) {
  try {
    // 1) Delete from Firebase
    const response = await fetch(
      `https://my-application-e9dd1-default-rtdb.firebaseio.com/Product/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert(`Deleted product with id: ${id}`);
      // 2) Remove from local state
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );
    } else {
      alert("Failed to delete product from database");
    }
  } catch (error) {
    alert("Error deleting product");
  }
}


  function handleUpdate(product) {
    navigation.navigate("UpdateProduct", { product });
  }

  function Item(props) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>Price: {props.price}</Text>
        <Text style={styles.text}>Description: {props.description}</Text>
        <View style={styles.buttonRow}>
          <Button title="Update" onPress={() => handleUpdate(props)} />
          <Button
            title="Delete"
            onPress={() => deleteProduct(props.id)}
            color="red"
          />
        </View>
      </View>
    );
  }

  

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ddd",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    color: "black",
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;
