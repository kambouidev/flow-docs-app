import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ViewMode } from "../types/IDocument";

interface ViewModeSelectorProps {
    viewMode: ViewMode;
    onChangeViewMode: (mode: ViewMode) => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, onChangeViewMode }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, viewMode === ViewMode.List && styles.active]}
                onPress={() => onChangeViewMode(ViewMode.List)}
            >
                <MaterialIcons name="view-list" size={24} color={viewMode === ViewMode.List ? "#007AFF" : "black"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, viewMode === ViewMode.Grid && styles.active]}
                onPress={() => onChangeViewMode(ViewMode.Grid)}
            >
                <MaterialIcons name="grid-view" size={24} color={viewMode === ViewMode.Grid ? "#007AFF" : "black"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    active: {
        backgroundColor: 'white',
    },
});

export default ViewModeSelector;
