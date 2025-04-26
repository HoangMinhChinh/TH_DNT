import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screen/HomeScreen';
import TabsScreen from './screen/TapsScreen';
import l1pj1 from './screen/lab1/l1pj1';
import l1pj2 from './screen/lab1/l1pj2';
import l1pj3 from './screen/lab1/l1pj3';
import l1pj4 from './screen/lab1/l1pj4';
import l1pj5 from './screen/lab1/l1pj5';
import l1pj6 from './screen/lab1/l1pj6';
import l1pj7 from './screen/lab1/l1pj7';
import l1pj8 from './screen/lab1/l1pj8';
import l1pj9 from './screen/lab1/l1pj9';
import l1pj10 from './screen/lab1/l1pj10';
import Lab2 from './screen/lab2/Lab2';

type RootStackParamList = {
  Home: undefined;
  Tabs: undefined;
  l1pj1: undefined;
  l1pj2: undefined;
  l1pj3: undefined;
  l1pj4: undefined;
  l1pj5: undefined;
  l1pj6: undefined;
  l1pj7: undefined;
  l1pj8: undefined;
  l1pj9: undefined;
  l1pj10: undefined;
  Lab2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tabs" component={TabsScreen} />
        <Stack.Screen name="l1pj1" component={l1pj1} />
        <Stack.Screen name="l1pj2" component={l1pj2} />
        <Stack.Screen name="l1pj3" component={l1pj3} />
        <Stack.Screen name="l1pj4" component={l1pj4} />
        <Stack.Screen name="l1pj5" component={l1pj5} />
        <Stack.Screen name="l1pj6" component={l1pj6} />
        <Stack.Screen name="l1pj7" component={l1pj7} />
        <Stack.Screen name="l1pj8" component={l1pj8} />
        <Stack.Screen name="l1pj9" component={l1pj9} />
        <Stack.Screen name="l1pj10" component={l1pj10} />
        <Stack.Screen name="Lab2" component={Lab2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}