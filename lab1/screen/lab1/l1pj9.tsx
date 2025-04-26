import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined; // Màn hình Home
  Tabs: undefined; // Màn hình Tabs
  pj1: undefined;  // Màn hình khác...
  pj9: undefined;  // Màn hình hiện tại
};

// Định nghĩa kiểu NavigationProp để hỗ trợ TypeScript
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dữ liệu hiển thị cho SectionList, được chia thành từng nhóm
const DATA = [
  { title: 'A', data: ['Apple', 'Avocado'] }, // Nhóm A
  { title: 'B', data: ['Banana', 'Blueberry'] }, // Nhóm B
];

// Định nghĩa component pj9
export default function pj9() {
  // Lấy đối tượng navigation (nếu cần điều hướng màn hình)
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* SectionList: Hiển thị danh sách có chia nhóm */}
      <SectionList
        sections={DATA} // Nguồn dữ liệu
        keyExtractor={(item, index) => item + index} // Tạo khóa duy nhất cho mỗi item
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text> // Hiển thị từng mục trong danh sách
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text> // Hiển thị tiêu đề nhóm
        )}
      />
    </View>
  );
}

// Định nghĩa style cho các thành phần giao diện
const styles = StyleSheet.create({
  // Style cho View container chính
  container: {
    flex: 1, // Chiếm toàn bộ màn hình
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
  },
  // Style cho tiêu đề từng nhóm (header)
  header: {
    fontWeight: 'bold', // Chữ in đậm
    backgroundColor: '#eee', // Nền màu xám nhạt
    paddingLeft: 20, // Khoảng cách bên trái
    paddingVertical: 10, // Khoảng cách trên dưới
    fontSize: 18, // Kích thước chữ lớn
  },
  // Style cho mỗi mục (item)
  item: {
    paddingLeft: 20, // Khoảng cách bên trái
    paddingVertical: 10, // Khoảng cách trên dưới
    fontSize: 16, // Kích thước chữ
    borderBottomWidth: 1, // Đường viền dưới
    borderBottomColor: '#ccc', // Màu đường viền
  },
});
