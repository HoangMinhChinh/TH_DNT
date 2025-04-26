import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Giảm khoảng cách giữa các ô
        alignItems: 'center',
        paddingHorizontal: 10, // Thêm padding để giới hạn khoảng cách
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#7ce0f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, // Giảm khoảng cách giữa các ô
    },
});

const Square = ({ label }: { label: string }) => (
    <View style={styles.box}>
        <Text>{label}</Text>
    </View>
);

export default function App() {
    return (
        <View style={styles.container}>
            <Square label="1" />
            <Square label="2" />
            <Square label="3" />
        </View>
    );
}