import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { timeAgo } from "../services/utils";
import { Ionicons } from "@expo/vector-icons";
import { INotification } from "../types/INotification";

const NotificationCard: FC<INotification> = ({ DocumentTitle, Timestamp, UserName }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.userName}>{UserName}</Text>
                <Text style={styles.action}>added new document!</Text>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.contentContainer}>
                    <Ionicons name="document-text-outline" size={24} color="black" />
                    <Text style={styles.contentText}>{DocumentTitle}</Text>
                </View>
                <View style={styles.timeAgoContainer}>
                    <Text style={styles.timeAgoText}>{timeAgo(Timestamp)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        margin: 5
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
    },
    cardContent: {
        flexDirection: "row",
        gap: 15,
        padding: 5
    },
    action: {
        fontSize: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    contentText: {
        fontSize: 14,
        fontWeight: "700"
    },
    timeAgoContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    timeAgoText: {
        fontWeight: "400",
        fontSize: 10,
        textAlign: 'right',
    },
})

export default NotificationCard;
