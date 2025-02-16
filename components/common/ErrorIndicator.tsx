import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@constants/theme';

export interface ErrorIndicatorProps {
    message: string;
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ message }) => {
    return (
        <View testID="error-indicator-container" style={styles.container}>
            <Ionicons
                testID="error-indicator-icon"
                name="alert-circle-outline"
                size={50}
                color={colors.errorRed}
            />
            <Text testID="error-indicator-message" style={styles.message}>
                {message}
            </Text>
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
        color: colors.darkGray,
    },
});

export default ErrorIndicator;
