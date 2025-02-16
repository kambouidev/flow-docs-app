import React, { FC } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { colors } from '@constants/theme';



interface BlockButtonProps {
    text: string,
    handlePress: () => void
    iconType?: "add";
    disabled?: boolean
}

const BlockButton: FC<BlockButtonProps> = ({ text, iconType, disabled, handlePress }) => {
    const iconMap = {
        "add": <Ionicons testID="icon-add" name="add" size={24} color={colors.white} />,
        // add more if needed
    };

    const icon = iconType ? iconMap[iconType] : null;

    return (
        <View style={styles.container} testID="block-button-container">
            <TouchableOpacity
                testID="block-button"
                style={[styles.button, disabled && styles.disable]}
                onPress={handlePress}
                disabled={disabled}
            >
                {icon && <View testID="icon-container">{icon}</View>}
                <Text style={styles.textButton} testID="button-text">{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 0.3
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.primaryBlue,
        padding: 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    textButton: {
        color: colors.white,
        fontSize: 16
    },
    disable: {
        opacity: .5
    }
})


export default BlockButton
