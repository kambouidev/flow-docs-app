import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type ToastIcon = 'success' | 'error' | 'info'
const getIcon = (type: ToastIcon) => {
    switch (type) {
        case 'success':
            return 'checkmark-circle-outline';
        case 'error':
            return 'alert-circle-outline';
        case 'info':
        default:
            return 'information-circle-outline';
    }
};

export const toastConfig = {
    newNotification: ({ props }: { props: { type: ToastIcon, userName: string, redirect: () => void }; }) => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props?.redirect}>
                <View style={styles.buttonContainer}>
                    <Ionicons name={getIcon(props?.type)} size={24} color={props?.type === 'error' ? '#dc3545' : '#28a745'} />
                    <Text><Text style={{ fontWeight: 'bold' }}>{props.userName}</Text> added new document!</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    }
})
