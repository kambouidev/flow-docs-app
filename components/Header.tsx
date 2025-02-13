import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
    title: string;
    onClose?: () => void
    goToNotifications?: () => void
    backButton?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onClose, backButton, goToNotifications }) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {backButton && <View>
                    <TouchableOpacity style={styles.backButton} onPress={backButton}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>}
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            {onClose && <View>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>}
            {goToNotifications && <View>
                <TouchableOpacity style={styles.notificationsButton} onPress={goToNotifications}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <View style={styles.dot}>
                        <Text style={styles.dotText}>99</Text>
                    </View>
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
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,

    },
    backButton: {
        padding: 16,
    },
    notificationsButton: {
        padding: 10,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 10
    },
    dot: {
        borderRadius: 15,
        position: "absolute",
        backgroundColor: 'blue',
        right: 8,
        top: 5,
    },
    dotText: {
        textAlign: "center",
        padding: 2,
        color: 'white',
        fontSize: 10
    }
});

export default Header;
