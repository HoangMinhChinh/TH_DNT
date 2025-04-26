// src/ButtonGrid.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

interface ButtonGridProps {
  onButtonPress: (value: string) => void;
  isDark: boolean;
}

const buttons = [
  ['sin', 'cos', 'tan', 'cot'],
  ['%', '^', '√'],
  ['C', 'DEL', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function ButtonGrid({ onButtonPress, isDark }: ButtonGridProps) {
  const isOperator = (val: string) => ['+', '-', '*', '/', '(', ')'].includes(val);
  const isFunction = (val: string) => ['C', 'DEL', '=', '%', '^', '√', 'sin', 'cos', 'tan', 'cot'].includes(val);

  return (
    <View style={styles.buttonGrid}>
      {buttons.map((row, idx) => (
        <View style={styles.row} key={idx}>
          {row.map((btn, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.button,
                isDark ? styles.darkButton : styles.lightButton,
                isOperator(btn) && (isDark ? styles.darkOperatorButton : styles.operatorButton),
                isFunction(btn) && (isDark ? styles.darkFunctionButton : styles.functionButton),
                pressed && styles.pressedButton,
              ]}
              onPress={() => onButtonPress(btn)}
            >
              <Text style={[styles.buttonText, isDark && { color: '#fff' }]}>{btn}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGrid: { flex: 0.6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  button: { flex: 1, margin: 3, paddingVertical: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  lightButton: { backgroundColor: '#e0e0e0' },
  darkButton: { backgroundColor: '#3a4b4c' },
  operatorButton: { backgroundColor: '#d4d4d4' },
  darkOperatorButton: { backgroundColor: '#5a6b6c' },
  functionButton: { backgroundColor: '#bbb' },
  darkFunctionButton: { backgroundColor: '#2a3b3c' },
  pressedButton: { opacity: 0.8 },
  buttonText: { fontSize: 20, color: '#000' },
});
