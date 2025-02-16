import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Animated,
    SafeAreaView,
    Dimensions
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAnimatedModal } from "../../hooks/useAnimatedModal";
import { useFilePicker } from "../../hooks/useFilePicker";
import { useDocumentForm } from "../../hooks/useDocumentForm";
import { colors } from "../../constants/theme";
import { BlockButton, Header } from "../common";

interface AddDocumentModalProps {
    visible: boolean;
    onClose: () => void;
    onAddDocument: (name: string, version: string, fileUris: string[]) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ visible, onClose, onAddDocument }) => {
    const [selectedFiles, setSelectedFiles] = useState<{ uri: string; name: string }[]>([]);

    const { overlayOpacity, modalTranslateY, handleCloseAnimation } = useAnimatedModal({
        visible, onClose
    });

    const { name, version, setName, setVersion, isFormValid, handleSubmit, resetForm } = useDocumentForm({
        onAddDocument,
        selectedFiles,
        setSelectedFiles
    });
    const { pickFiles, removeFile } = useFilePicker({
        setSelectedFiles
    });

    const handleFormSubmit = () => {
        handleSubmit();
        handleClose();
    };

    const handleClose = () => {
        resetForm();
        handleCloseAnimation();
    }

    return (
        <Modal visible={visible} transparent animationType="none">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoidingView}
                    >
                        <Animated.View
                            style={[
                                styles.modalContent,
                                { transform: [{ translateY: modalTranslateY }] }
                            ]}
                        >
                            <Header title={"Add document"} onClose={handleClose} />

                            <ScrollView
                                contentContainerStyle={styles.scrollContainer}
                                bounces={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Document name"
                                        value={name}
                                        onChangeText={setName}
                                    />

                                    <Text style={styles.label}>Version</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Document version"
                                        value={version}
                                        onChangeText={setVersion}
                                    />

                                    <Text style={styles.label}>Files</Text>
                                    <TouchableOpacity
                                        style={styles.fileButton}
                                        onPress={pickFiles}
                                    >
                                        <MaterialIcons name="attach-file" size={20} color={colors.linkBlue} />
                                        <Text style={styles.fileText}>
                                            Add Files
                                        </Text>
                                    </TouchableOpacity>

                                    {selectedFiles.map((file, index) => (
                                        <View key={index} style={styles.fileItem}>
                                            <Text
                                                style={styles.fileName}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {file.name}
                                            </Text>
                                            <TouchableOpacity onPress={() => removeFile(index)}>
                                                <MaterialIcons name="close" size={20} color={colors.errorRed} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>

                            <SafeAreaView style={styles.buttonContainer}>
                                <BlockButton
                                    text="Submit"
                                    handlePress={handleFormSubmit}
                                    disabled={!isFormValid}
                                />
                            </SafeAreaView>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.overlay,
        justifyContent: "flex-end",
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: Dimensions.get("window").height * 0.55,
        overflow: "hidden",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
    },
    formContainer: {
        flex: 1,
        paddingBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.borderGray,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    fileButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.borderGray,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    fileText: {
        color: colors.linkBlue,
        marginLeft: 5,
    },
    fileItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.borderGray,
        borderRadius: 5,
        marginTop: 5,
    },
    fileName: {
        flex: 1,
        marginRight: 10,
        color: colors.darkGray,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        borderTopWidth: 0.2,
        borderColor: colors.lightBorderGray,
    },
});

export default AddDocumentModal;
