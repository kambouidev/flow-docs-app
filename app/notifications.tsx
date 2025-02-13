import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Header title="Notifications" backButton={router.back} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA"
    },

});
