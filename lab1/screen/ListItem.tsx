import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ListItemProps = {
  title: string;
};

const ListItem: React.FC<ListItemProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default ListItem;