import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

function Login() {
  const [modalVisible, setmodalVisible] = useState(false);

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={Styles.centeredView}>
          <View>
            <Text>Login Successfully!!</Text>
            <Button title="Close" onPress={() => setmodalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View>
        <TextInput placeholder="Enter Email" />
        <TextInput placeholder="Enter Password" />
        <Button title="Submit" onPress={() => setmodalVisible(true)} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Login;
