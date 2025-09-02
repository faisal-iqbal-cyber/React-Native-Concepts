import React, { useState } from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet } from 'react-native';


function CreateProduct({navigation,route}) {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
  async function handleSubmit() {
  if (!name || !price) {
    alert('Please enter both name and price.');
    return;
  }

  try {
    const response = await fetch('https://my-application-e9dd1-default-rtdb.firebaseio.com/Products.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name: name,
        Product_price: price,
      }),
    });

    if (response.ok) {
      alert('Product added successfully!');
      setName('');
      setPrice('');
    } else {
      alert('Failed to add product.');
    }
  } catch (error) {
    console.error(error);
    alert('Error: ' + error.message);
  }
}


  return (
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Create Product</Text>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Product:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Product'
          placeholderTextColor='gray'
          onChangeText={(e)=>setName(e)}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Price'
          placeholderTextColor='gray'
          onChangeText={(e)=>setPrice(e)}
        />

        <Button title='Create' onPress={handleSubmit} />
      </View>

      {/* Modal */}
      {/* <View>
        <Modal animationType='slide' transparent={true} visible={visibleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Login Successfully !!</Text>
              {/* <Button title='Close' onPress={() => setVisibleModal(false)} /> */}
            {/* </View> */}
          {/* </View> */}
      {/* </Modal> */}
      {/* </View> */} 
      
    </View>
  );
}

export default CreateProduct;

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
});
