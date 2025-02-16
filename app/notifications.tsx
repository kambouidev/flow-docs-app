import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useNotificationsStore } from "../stores/notifications.store";
import { colors } from "../constants/theme";
import { NotificationCard } from "../components/notifications";
import { Header } from "../components/common";


export default function NotificationsScreen() {
    const { notifications, setSeenNotifications } = useNotificationsStore();
    const router = useRouter();


    useEffect(() => {
        const unseenNotifications = notifications.some(notification => !notification.seen);
        return () => {
            if (unseenNotifications) {
                setSeenNotifications();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <Header title="Notifications" backButton={router.back} />
            <View style={styles.content}>
                <FlatList
                    style={{ padding: 16 }}
                    bounces={false}
                    data={notifications}
                    keyExtractor={(item) => item.DocumentID}
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
        backgroundColor: colors.lightGray
    },
    content: {
        flex: 1,
    }

});
