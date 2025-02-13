import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { useRouter } from "expo-router";
import NotificationCard from "../components/NotificationCard";
import { useNotifications } from "../stores/notifications.store";


export default function NotificationsScreen() {
    const { notifications } = useNotifications();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Header title="Notifications" backButton={router.back} />
            <View style={styles.content}>
                <FlatList
                    bounces={false}
                    data={notifications}
                    keyExtractor={(item) => item.document.ID}
                    renderItem={({ item }) =>
                        <NotificationCard  {...item} />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA"
    },
    content: {
        padding: 5
    }

});
