import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorIndicatorProps {
    message: string;
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ message }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="alert-circle-outline" size={50} color="red" />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: 'red',
    },
});

export default ErrorIndicator;
