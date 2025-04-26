import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 40 }}>
      <TouchableOpacity onPress={() => Alert.alert("Hello!")}>
        <Text style={{ padding: 10, backgroundColor: 'lightblue' }}>Custom Button</Text>
      </TouchableOpacity>
    </View>
  );
}