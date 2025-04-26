import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { evaluate } from 'mathjs';

// Component CalcButton
const CalcButton = ({
  title,
  onPress,
  isDark,
  isOperator = false,
  isFunction = false,
}: {
  title: string;
  onPress: (value: string) => void;
  isDark: boolean;
  isOperator?: boolean;
  isFunction?: boolean;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isDark && styles.darkButton,
        isOperator && (isDark ? styles.darkOperatorButton : styles.operatorButton),
        isFunction && (isDark ? styles.darkFunctionButton : styles.functionButton),
        pressed && styles.buttonPressed,
      ]}
      onPress={() => onPress(title)}
    >
      <Text style={[styles.buttonText, isDark && styles.darkText]}>{title}</Text>
    </Pressable>
  );
};

export default function Lab2() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isResultShown, setIsResultShown] = useState(false);
  const [sound, setSound] = useState<any>(null);

  // Phát âm thanh khi bấm nút
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/click.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  const handlePress = (value: string) => {
    playSound();

    const isNumber = /^[0-9.]$/.test(value);

    if (value === 'C') {
      setExpression('');
      setResult('');
      setIsResultShown(false);
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        let expr = expression;

        // Kiểm tra ngoặc đóng
        const openBrackets = (expr.match(/\(/g) || []).length;
        const closeBrackets = (expr.match(/\)/g) || []).length;
        if (openBrackets !== closeBrackets) {
          setResult('Lỗi: Thiếu ngoặc');
          setIsResultShown(true);
          return;
        }

        // Xử lý % theo ngữ cảnh
        if (expr.includes('%')) {
          expr = expr.replace(/(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)%/g, (match, num1, _, op, num2) => {
            const percentage = `(${num1} * ${num2}/100)`;
            return `${num1} ${op} ${percentage}`;
          });
          expr = expr.replace(/(\d+(\.\d+)?)%/g, '$1/100');
        }

        // Thay thế √ thành sqrt(
        expr = expr.replace(/√\(/g, 'sqrt(');

        // Thay thế cot thành 1/tan(
        expr = expr.replace(/cot\(/g, '1/tan(');

        // Xử lý sin, cos, tan: Chuyển độ sang radian
        const trigFunctions = ['sin', 'cos', 'tan'];
        let modifiedExpr = expr;
        for (const func of trigFunctions) {
          const regex = new RegExp(`${func}\\(([^()]+)\\)`, 'g');
          modifiedExpr = modifiedExpr.replace(regex, (match, innerExpr) => {
            try {
              const innerValue = evaluate(innerExpr);
              const radian = `${innerValue} * Math.PI / 180`; // Chuyển độ sang radian
              return `${func}(${radian})`;
            } catch {
              throw new Error('Lỗi: Biểu thức trong hàm lượng giác không hợp lệ');
            }
          });
        }

        const calcResult = evaluate(modifiedExpr).toString();
        setResult(calcResult);
        setHistory([...history, `${expression} = ${calcResult}`]);
        setIsResultShown(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setResult('Lỗi: ' + error.message);
        } else {
          setResult('Lỗi: Không xác định');
        }
        setIsResultShown(true);
      }
    } else {
      // Nếu ấn sin, cos, tan, cot, √ thì tự động thêm dấu (
      if (['sin', 'cos', 'tan', 'cot', '√'].includes(value)) {
        setExpression(prev => prev + value + '(');
      } else if (value === '^') {
        const lastChar = expression.slice(-1);
        if (!/[0-9)]/.test(lastChar)) {
          setResult('Lỗi: Cần số trước ^');
          setIsResultShown(true);
          return;
        }
        setExpression(prev => prev + value);
      } else if (isResultShown && isNumber) {
        setExpression(value);
      } else {
        setExpression(prev => prev + value);
      }
      setIsResultShown(false);
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'cot'],
    ['%', '^', '√'],
    ['C', 'DEL', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const recentHistory = history.slice(-3).reverse();

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.displayContainer}>
        <View style={[styles.leftDisplay, isDark && styles.darkLeftDisplay]}>
          <ScrollView style={styles.fullHistoryList}>
            {history.map((item, index) => (
              <Text
                key={index}
                style={[styles.historyItem, isDark && styles.darkHistoryText]}
              >
                {item}
              </Text>
            ))}
          </ScrollView>
          <View style={styles.switchContainer}>
            <Entypo name="light-up" size={24} color={isDark ? '#ccc' : '#333'} />
            <Pressable onPress={() => setIsDark(!isDark)}>
              <Entypo name={isDark ? "moon" : "moon"} size={24} color={isDark ? '#ccc' : '#333'} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.rightDisplay, isDark && styles.darkRightDisplay]}>
          <View style={styles.recentHistoryList}>
            {recentHistory.map((item, index) => (
              <Text
                key={index}
                style={[styles.recentHistoryItem, isDark && styles.darkHistoryText]}
              >
                {item}
              </Text>
            ))}
          </View>
          <Text style={[styles.expression, isDark && styles.darkExpression]}>
            {expression || '0'}
          </Text>
          <Text style={[styles.result, isDark && styles.darkText]}>
            {result || '0'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonGrid}>
        {buttons.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((btn, btnIndex) => (
              <CalcButton
                key={btnIndex}
                title={btn}
                onPress={handlePress}
                isDark={isDark}
                isOperator={['+', '-', '*', '/', '(', ')'].includes(btn)}
                isFunction={['C', 'DEL', '=', '%', '^', '√', 'sin', 'cos', 'tan', 'cot'].includes(btn)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  darkContainer: {
    backgroundColor: '#1c2526',
  },
  displayContainer: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftDisplay: {
    flex: 0.4,
    backgroundColor: '#f0f0f0',
    padding: 10,
    justifyContent: 'space-between',
  },
  darkLeftDisplay: {
    backgroundColor: '#4a5b5c',
  },
  rightDisplay: {
    flex: 0.6,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  darkRightDisplay: {
    backgroundColor: '#3a4b4c',
  },
  fullHistoryList: {
    flex: 1,
  },
  recentHistoryList: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignSelf: 'flex-end',
  },
  historyItem: {
    fontSize: 16,
    textAlign: 'left',
    color: '#666',
    paddingVertical: 3,
  },
  recentHistoryItem: {
    fontSize: 16,
    textAlign: 'right',
    color: '#666',
  },
  darkHistoryText: {
    color: '#fff',
  },
  expression: {
    fontSize: 24,
    textAlign: 'right',
    color: '#333',
    marginBottom: 5,
  },
  darkExpression: {
    fontSize: 24,
    textAlign: 'right',
    color: '#fff',
    marginBottom: 5,
  },
  result: {
    fontSize: 56,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonGrid: {
    flex: 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    margin: 3,
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkButton: {
    backgroundColor: '#3a4b4c',
  },
  operatorButton: {
    backgroundColor: '#f0f0f0',
  },
  darkOperatorButton: {
    backgroundColor: '#4a5b5c',
  },
  functionButton: {
    backgroundColor: '#d4d4d4',
  },
  darkFunctionButton: {
    backgroundColor: '#2a3b3c',
  },
  buttonPressed: {
    backgroundColor: '#b0b0b0',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});