import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function pj6() {
  // Hook useNavigation: Lấy đối tượng navigation để điều hướng, nếu cần sử dụng
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ScrollView: Cho phép cuộn danh sách nếu quá dài */}
      <ScrollView>
        {/* Tạo danh sách 20 phần tử với Array.map và hiển thị từng phần tử */}
        {[...Array(20)].map((_, i) => (
          <Text key={i} style={styles.item}>
            Item {i + 1} {/* Hiển thị số thứ tự của mỗi phần tử */}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

// Định nghĩa style cho màn hình
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm toàn bộ không gian màn hình
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
  },
  // Style cho từng item trong danh sách
  item: {
    padding: 10, // Khoảng cách bên trong của mỗi item
    fontSize: 16, // Kích thước chữ
    borderBottomWidth: 1, // Đường viền dưới mỗi item
    borderBottomColor: '#ccc', // Màu viền dưới xám nhạt
  },
});
