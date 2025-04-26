import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyButton from '../../MyButton'; // Nhập MyButton của bạn


type RootStackParamList = {
  // Define your screen names and their params here
  Screen1: undefined;
  Screen2: { param1: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function pj4() {
  const navigation = useNavigation<NavigationProp>();
  const [count, setCount] = useState(0); // Khởi tạo state count với giá trị ban đầu là 0

  return (
    <View style={styles.container}>

      {/* Văn bản hiển thị số đếm */}
      <Text style={styles.countText}>Bạn đã bấm {count} lần</Text>

      {/* Nút tăng đếm */}
      <MyButton
        title="Bấm đi"
        onPress={() => setCount(count + 1)} // Tăng count lên 1 khi nhấn
        style={styles.actionButton} // Ghi đè để dùng màu cam thay vì xanh
      />

      {/* Nút reset */}
      <MyButton
        title="Lại nè"
        onPress={() => setCount(0)} // Đặt lại count về 0 khi nhấn
        style={styles.actionButton} // Ghi đè để dùng màu cam
      />
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionButton: {
    width: 150,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10, // Khoảng cách giữa các nút
  },
});