import React from 'react';
import { View } from 'react-native';
import MyButton from '../../MyButton';

const HomeScreen = () => (
  <View>
    <MyButton
      title="Click Here"
      onPress={() => alert("Pressed!")}
      style={{backgroundColor: 'orange' }}
    />
  </View>
);

export default HomeScreen;
