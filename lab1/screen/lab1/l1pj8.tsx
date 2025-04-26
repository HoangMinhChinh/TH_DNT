import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyButton from '../../MyButton';

type RootStackParamList = {
  Home: undefined; Tabs: undefined; pj1: undefined; pj2: undefined; pj3: undefined;
  pj4: undefined; pj5: undefined; pj6: undefined; pj7: undefined; pj8: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const data = Array.from({ length: 50 }, (_, i) => ({ key: `${i}`, name: `Item ${i + 1}` }));

export default function pj8() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  item: { padding: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});