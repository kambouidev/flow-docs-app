import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IDocument } from '../types/IDocument';

interface DocumentCardSimpleProps {
    document: IDocument
}



export const DocumentCardSimple: React.FC<DocumentCardSimpleProps> = ({ document: { Title, Version } }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{Title}</Text>
        <Text style={styles.cardVersion}>Version {Version}</Text>
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
