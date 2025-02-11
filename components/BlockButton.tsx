import React, { FC, ReactElement } from 'react'
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
    iconType?: IconType;
}

const BlockButton: FC<BlockButtonProps> = ({ text, iconType }) => {
    const icon = iconType ? iconMap[iconType] : null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
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
        borderTopWidth: 0.5
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
})


export default BlockButton
