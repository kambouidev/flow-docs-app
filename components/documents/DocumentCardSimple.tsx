import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IDocument } from '../../types/IDocument';
import { colors, globalShadow } from '../../constants/theme';

interface DocumentCardSimpleProps {
    document: IDocument
}



const DocumentCardSimple: React.FC<DocumentCardSimpleProps> = ({ document: { Title, Version } }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{Title}</Text>
        <Text style={styles.cardVersion}>Version {Version}</Text>
    </View>
);


const styles = StyleSheet.create({
    card: {
        ...globalShadow,
        flex: 1,
        backgroundColor: colors.white,
        padding: 15,
        margin: 5,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '47%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    cardVersion: {
        fontSize: 12,
        color: colors.gray
    },
});

export default DocumentCardSimple;
