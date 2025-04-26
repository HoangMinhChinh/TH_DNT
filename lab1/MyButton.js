import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MyButton = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default MyButton;
