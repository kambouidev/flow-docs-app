import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
    title: string;
    onClose?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onClose }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            {onClose && <View>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,

    },
    backButton: {
        padding: 16,
    }
});

export default Header;
