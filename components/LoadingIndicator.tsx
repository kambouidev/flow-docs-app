import React, { FC } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
    message: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ message }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
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
        color: '#000',
    },
});

export default LoadingIndicator;
