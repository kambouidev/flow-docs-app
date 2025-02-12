import React, { FC } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export enum IconType {
    Add = "add",
    // add more if needed
}

const iconMap = {
    [IconType.Add]: <Ionicons name="add" size={24} color="white" />,
    // add more if needed
};

interface BlockButtonProps {
    text: string,
    handlePress: () => void
    iconType?: IconType;
    disabled?: boolean
}

const BlockButton: FC<BlockButtonProps> = ({ text, iconType, disabled, handlePress }) => {
    const icon = iconType ? iconMap[iconType] : null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, disabled && styles.disable]} onPress={handlePress} disabled={disabled}>
                {icon && <View>{icon}</View>}
                <Text style={styles.textButton}>{text}</Text>
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
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    textButton: {
        color: 'white',
        fontSize: 16
    },
    disable: {
        opacity: .5
    }
})


export default BlockButton
