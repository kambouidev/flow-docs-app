import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DocumentCardDetailsProps {
    title: string;
    version: string;
    contributors: string[];
    attachments: string[]
}



export const DocumentCardDetails: React.FC<DocumentCardDetailsProps> = ({ title, version, contributors, attachments }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>
            {title} <Text style={styles.cardVersion}>Version {version}</Text>
        </Text>
        <View style={styles.cardcontent}>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardSubtitle}>Contributors</Text>
                {contributors.map((contributor, index) => <Text key={index}>{contributor}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardSubtitle}>Attachments</Text>
                {attachments.map((file, index) => <Text key={index}>{file}</Text>)}
            </View>
        </View>
    </View>
);


const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 15,
        margin: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    cardcontent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    cardVersion: {
        fontSize: 12,
        color: "gray"
    },
    cardSubtitle: {
        fontWeight: "bold",
        marginTop: 5
    },
});
