import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function NewProduct({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [Quantity, setQuantity] = useState('');

  function submitHandler() {
    fetch('https://my-application-4b743-default-rtdb.firebaseio.com/product.json', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
  body: JSON.stringify({
    name: name,
    price: price,
    description:description,
    Quantity:Quantity
  }),
});
  }

  function resetHandler() {
   
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create New Product</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputFields}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.inputFields}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter Price"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputFields}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
        />
        <TextInput
          style={styles.inputFields}
          value={Quantity}
          onChangeText={setQuantity}
          placeholder="Enter Quantity"
        />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <Button title="Create" onPress={submitHandler} />
        </View>
      </View>
    </View>
  );
}

export default NewProduct;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    flex: 3,
  },
  inputFields: {
    borderWidth: 2,
    height: 40,
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttons: {
    flex: 1,
    marginHorizontal: 10,
  },
});
