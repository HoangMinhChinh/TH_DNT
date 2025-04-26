// src/Lab2.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import ButtonGrid from './ButtonGrid';
import { calculateExpression } from './CalculatorEngine';

export default function Lab2() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/click.mp3'));
      setSound(sound);
    };
    loadSound();
    return () => { sound?.unloadAsync(); };
  }, []);

  const playClickSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const handleButtonPress = (value: string) => {
    playClickSound();

    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '=') {
      const res = calculateExpression(expression);
      setResult(res);
      if (!res.startsWith('Lỗi')) {
        setHistory(prev => [...prev, `${expression} = ${res}`]);
      }
    } else {
      if (['sin', 'cos', 'tan', 'cot', '√'].includes(value)) {
        setExpression(prev => prev + value + '(');
      } else if (value === '^') {
        setExpression(prev => prev + '^');
      } else {
        setExpression(prev => prev + value);
      }
    }
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.displayContainer}>
        <View style={[styles.leftDisplay, isDark && styles.darkLeft]}>
          <ScrollView>
            {history.slice(-10).reverse().map((item, idx) => (
              <Text key={idx} style={[styles.historyText, isDark && { color: '#fff' }]}>
                {item}
              </Text>
            ))}
          </ScrollView>
          <Pressable onPress={() => setIsDark(!isDark)} style={styles.themeButton}>
            <Entypo name={isDark ? 'light-up' : 'moon'} size={24} color={isDark ? '#ccc' : '#333'} />
          </Pressable>
        </View>

        <View style={[styles.rightDisplay, isDark && styles.darkRight]}>
          <Text style={[styles.expression, isDark && { color: '#fff' }]}>{expression || '0'}</Text>
          <Text style={[styles.result, isDark && { color: '#fff' }]}>{result || '0'}</Text>
        </View>
      </View>

      <ButtonGrid onButtonPress={handleButtonPress} isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  darkContainer: { backgroundColor: '#1c2526' },
  displayContainer: { flexDirection: 'row', marginBottom: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff' },
  leftDisplay: { flex: 0.4, padding: 10, backgroundColor: '#f0f0f0', justifyContent: 'space-between' },
  darkLeft: { backgroundColor: '#4a5b5c' },
  rightDisplay: { flex: 0.6, padding: 10, justifyContent: 'flex-end', backgroundColor: '#fff' },
  darkRight: { backgroundColor: '#3a4b4c' },
  expression: { fontSize: 24, textAlign: 'right', marginBottom: 5, color: '#333' },
  result: { fontSize: 48, textAlign: 'right', fontWeight: 'bold', color: '#000' },
  historyText: { fontSize: 16, marginBottom: 4, color: '#666' },
  themeButton: { marginTop: 10, alignItems: 'flex-start' },
});
