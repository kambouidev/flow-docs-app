import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IDocument } from '../../types/IDocument';
import { Entypo } from '@expo/vector-icons';
import { timeAgo } from '../../services/utils';
import { colors, globalShadow } from '../../constants/theme';

interface DocumentCardDetailsProps {
    document: IDocument,
    handleShareDocument: (document: IDocument) => void
}



const DocumentCardDetails: React.FC<DocumentCardDetailsProps> = ({ document, handleShareDocument }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
                {document.Title} <Text style={styles.cardVersion}>Version {document.Version}</Text>
            </Text>
            <TouchableOpacity style={styles.shareButton} onPress={() => handleShareDocument(document)}>
                <Entypo name="share" size={24} color={colors.linkBlue} />
            </TouchableOpacity>
        </View>

        <View style={styles.cardcontent}>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardSubtitle}>Contributors</Text>
                {document.Contributors.map(({ ID, Name }) => <Text key={ID}>{Name}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardSubtitle}>Attachments</Text>
                {document.Attachments.map((file, index) => <Text key={index}>{file}</Text>)}
            </View>

        </View>
        <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.timeAgo}>{timeAgo(document.CreatedAt)}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    card: {
        ...globalShadow,
        backgroundColor: colors.white,
        padding: 15,
        margin: 10,
        borderRadius: 8,
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    shareButton: {
        padding: 5,
        borderRadius: 5
    },
    cardcontent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    cardVersion: {
        fontSize: 12,
        color: colors.gray,
        fontWeight: '400'
    },
    cardSubtitle: {
        fontWeight: "bold",
        marginTop: 5
    },
    timeAgo: {
        fontWeight: "400",
        fontSize: 10,
        textAlign: 'right'
    },
});

export default DocumentCardDetails
