import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IDocument } from "../types/IDocument";
import { timeAgo } from "../services/utils";
import { FontAwesome } from "@expo/vector-icons";

interface NotificationCardProps {
    document: IDocument,
    seen: boolean
}
const NotificationCard: FC<NotificationCardProps> = ({ document, seen }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>New upload</Text>
                <Text style={styles.documentTitle}>{document.Title}</Text>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.contentContainer}>
                    <FontAwesome name="group" size={18} color="black" />
                    <Text style={styles.contentText}>{document.Contributors.length}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <FontAwesome name="paperclip" size={18} color="black" />
                    <Text style={styles.contentText}>{document.Attachments.length}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <FontAwesome name="tag" size={18} color="black" />
                    <Text style={styles.contentText}>{document.Version}</Text>
                </View>
                <View style={styles.timeAgoContainer}>
                    <Text style={styles.timeAgoText}>{timeAgo(document.CreatedAt)}</Text>
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
    cardTitle: {
        fontSize: 16,
    },
    documentTitle: {
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
        color: 'blue'
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
