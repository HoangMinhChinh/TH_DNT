import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyButton from '../../MyButton'; 
import ListItem from '../ListItem';

type RootStackParamList = {
  Home: undefined; // Màn hình Home
  Tabs: undefined; // Màn hình Tabs
  pj1: undefined;  // Các màn hình khác
  pj10: undefined; // Màn hình hiện tại
};

// Định nghĩa kiểu NavigationProp hỗ trợ TypeScript
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Thành phần chính của màn hình
export default function pj10() {
  const navigation = useNavigation<NavigationProp>(); // Lấy đối tượng điều hướng

  const [input, setInput] = useState(''); // Trạng thái cho dữ liệu nhập từ người dùng
  const [items, setItems] = useState<{ key: string; title: string }[]>([]); // Trạng thái cho danh sách các mục

  // Hàm thêm mục mới vào danh sách
  const addItem = () => {
    if (input.trim()) { // Kiểm tra dữ liệu không rỗng
      setItems([...items, { key: Date.now().toString(), title: input.trim() }]); // Thêm mục vào danh sách
      setInput(''); // Xóa dữ liệu nhập sau khi thêm
    }
  };

  return (
    <View style={styles.container}>
      {/* TextInput: Nhập dữ liệu từ người dùng */}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput} // Cập nhật trạng thái khi nhập
        placeholder="Enter item" // Gợi ý văn bản trong ô nhập
      />
      {/* MyButton: Nút để thêm dữ liệu vào danh sách */}
      <MyButton
        title="Submit" // Văn bản trên nút
        onPress={addItem} // Hàm xử lý khi nhấn nút
        style={styles.submitButton} // Style tùy chỉnh cho nút
      />
      {/* FlatList: Hiển thị danh sách các mục */}
      <FlatList
        data={items} // Dữ liệu nguồn
        renderItem={({ item }) => <ListItem title={item.title} />} // Render từng mục trong danh sách
        keyExtractor={(item) => item.key} // Định danh duy nhất cho mỗi mục
        style={styles.list} // Style cho danh sách
      />
    </View>
  );
}

// Định nghĩa style cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ màn hình
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
  },
  input: {
    marginTop: 80, // Khoảng cách từ đầu màn hình
    marginHorizontal: 20, // Khoảng cách hai bên
    padding: 10, // Khoảng cách bên trong ô nhập
    borderWidth: 1, // Đường viền xung quanh
    borderColor: '#ccc', // Màu viền xám nhạt
    borderRadius: 5, // Góc viền bo tròn
    fontSize: 16, // Kích thước chữ
  },
  submitButton: {
    margin: 20, // Khoảng cách từ các thành phần khác
    backgroundColor: 'orange', // Màu nền của nút
    paddingVertical: 15, // Khoảng cách trên và dưới
  },
  list: {
    flex: 1, // Chiếm không gian còn lại của màn hình
    marginHorizontal: 20, // Khoảng cách hai bên
  },
});
