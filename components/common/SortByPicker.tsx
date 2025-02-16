import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SortOption } from "@/types/IDocument";
import { colors } from "@constants/theme";

interface SortByPickerProps {
    onSelect: (value: SortOption) => void;
    onToggleOrder: () => void;
    orderAscending: boolean;
}

const SortByPicker: React.FC<SortByPickerProps> = ({ onSelect, onToggleOrder, orderAscending }) => {
    const [selected, setSelected] = useState<SortOption>(SortOption.Name);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.container} testID="sort-picker-container">
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
                testID="sort-button"
            >
                <MaterialIcons name="sort" size={20} color={colors.primaryBlue} />
                <Text style={styles.buttonText} testID="sort-text">
                    Sort by: <Text style={styles.sortText}>{selected}</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.orderButton}
                onPress={onToggleOrder}
                testID="order-button"
            >
                <Entypo
                    name={orderAscending ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={colors.primaryBlue}
                    testID="order-icon"
                />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                testID="sort-modal"
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={selected}
                            onValueChange={(value: SortOption) => {
                                setSelected(value);
                                onSelect(value);
                                setModalVisible(false);
                            }}
                        >
                            {Object.values(SortOption).map((option) => (
                                <Picker.Item key={option} label={option.charAt(0).toUpperCase() + option.slice(1)} value={option} />
                            ))}
                        </Picker>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                            testID="close-modal-button"
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.borderGray,
        backgroundColor: colors.white
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    sortText: { fontWeight: "condensed" },
    orderButton: {
        padding: 10,
        borderLeftWidth: 1,
        borderColor: colors.borderGray
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.overlay
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 5,
        width: 250
    },
    closeButton: {
        marginTop: 10,
        alignSelf: "center",
        padding: 10
    },
    closeText: {
        fontSize: 16,
        color: colors.accentBlue
    },
});

export default SortByPicker;
