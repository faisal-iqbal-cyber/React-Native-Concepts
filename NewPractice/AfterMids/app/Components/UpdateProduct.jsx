import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

function UpdateProduct({ route, navigation }) {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  async function handleSubmit() {
    try {
      const response = await fetch(
        `https://my-application-e9dd1-default-rtdb.firebaseio.com/Product/${product.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_name: name,
            product_price: price,
            product_description: description,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Product updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update product.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        Update Product
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Product:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Product"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          placeholderTextColor="gray"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="gray"
          value={description}
          onChangeText={setDescription}
        />

        <Button title="Update" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default UpdateProduct;
