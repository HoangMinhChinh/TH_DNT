import React, { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';

export default () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter name"
      />
      <Button title="Submit" onPress={() => alert(`Hello, ${name}!`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 5,
  },
});