import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DocumentCardSimpleProps {
    title: string;
    version: string;
}



export const DocumentCardSimple: React.FC<DocumentCardSimpleProps> = ({ title, version }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardVersion}>Version {version}</Text>
    </View>
);


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "white",
        padding: 15,
        margin: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    cardVersion: {
        fontSize: 12,
        color: "gray"
    },
});
