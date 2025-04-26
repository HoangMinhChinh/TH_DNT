import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const exercises = [
    { title: 'Lab 1 - Project 1', screen: 'l1pj1' },
    { title: 'Lab 1 - Project 2', screen: 'l1pj2' },
    { title: 'Lab 1 - Project 3', screen: 'l1pj3' },
    { title: 'Lab 1 - Project 4', screen: 'l1pj4' },
    { title: 'Lab 1 - Project 5', screen: 'l1pj5' },
    { title: 'Lab 1 - Project 6', screen: 'l1pj6' },
    { title: 'Lab 1 - Project 7', screen: 'l1pj7' },
    { title: 'Lab 1 - Project 8', screen: 'l1pj8' },
    { title: 'Lab 1 - Project 9', screen: 'l1pj9' },
    { title: 'Lab 1 - Project 10', screen: 'l1pj10' },
    { title: 'Lab 2 - Calculator', screen: 'Lab2' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thực hành React Native</Text>
      <View style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(exercise.screen as keyof RootStackParamList)}
          >
            <Text style={styles.buttonText}>{exercise.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});