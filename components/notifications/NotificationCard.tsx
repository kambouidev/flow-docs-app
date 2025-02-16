import React, { FC } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { timeAgo } from "@services/utils";
import { Ionicons } from "@expo/vector-icons";
import { INotification } from "@/types/INotification";
import { useBlinkAnimation } from "@hooks/useBlinkAnimation";
import { colors } from "@constants/theme";

const NotificationCard: FC<INotification> = ({ DocumentTitle, Timestamp, UserName, seen }) => {
    const animatedBackground = useBlinkAnimation(!seen);


    return (
        <Animated.View style={[
            styles.card,
            !seen && { backgroundColor: animatedBackground }
        ]}>
            <View style={styles.cardHeader}>
                <Text style={styles.userName}>{UserName}</Text>
                <Text style={styles.action}>added new document!</Text>
            </View>
            <View>
                <View style={styles.contentContainer}>
                    <Ionicons name="document-text-outline" size={24} color={colors.black} />
                    <Text style={styles.contentText}>{DocumentTitle}</Text>
                </View>
                <View style={styles.timeAgoContainer}>
                    <Text style={styles.timeAgoText}>{timeAgo(Timestamp)}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        margin: 5
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
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
