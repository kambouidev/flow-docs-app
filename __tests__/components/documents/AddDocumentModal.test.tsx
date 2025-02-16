import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import AddDocumentModal from '@components/documents/AddDocumentModal';
import { colors } from '@constants/theme';

const mockHandleCloseAnimation = jest.fn();

// Mock complete de los iconos
jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: ({ testID, name, size, color }: any) => (
        <mock-icon
            testID={testID || `icon-${name}`}
            data-icon-name={name}
            data-size={size}
            data-color={color}
        />
    ),
    Ionicons: ({ testID, name, size, color }: any) => (
        <mock-icon
            testID={testID || `icon-${name}`}
            data-icon-name={name}
            data-size={size}
            data-color={color}
        />
    )
}));

// Mock de los hooks personalizados
jest.mock('@hooks/useAnimatedModal', () => ({
    useAnimatedModal: () => ({
        overlayOpacity: { value: 0.5 },
        modalTranslateY: { value: 0 },
        handleCloseAnimation: mockHandleCloseAnimation
    })
}));

jest.mock('@hooks/useFilePicker', () => ({
    useFilePicker: () => ({
        pickFiles: jest.fn(),
        removeFile: jest.fn()
    })
}));

jest.mock('@hooks/useDocumentForm', () => ({
    useDocumentForm: () => ({
        name: '',
        version: '',
        setName: jest.fn(),
        setVersion: jest.fn(),
        isFormValid: false,
        handleSubmit: jest.fn(),
        resetForm: jest.fn()
    })
}));

describe('AddDocumentModal', () => {
    const mockOnClose = jest.fn();
    const defaultProps = {
        visible: true,
        onClose: mockOnClose,
        onAddDocument: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render modal with correct elements', () => {
        const { getByText, getByTestId } = render(
            <AddDocumentModal {...defaultProps} />
        );

        expect(getByTestId('modal-content')).toBeTruthy();
        expect(getByText('Add document')).toBeTruthy();
        expect(getByTestId('name-input')).toBeTruthy();
        expect(getByTestId('version-input')).toBeTruthy();
        expect(getByTestId('add-files-button')).toBeTruthy();
        expect(getByText('Submit')).toBeTruthy();
    });

    it('should handle form submission', () => {
        const { getByText } = render(
            <AddDocumentModal {...defaultProps} />
        );


        fireEvent.press(getByText('Submit'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(0);
    });

    it('should handle modal close', () => {
        const { getByTestId } = render(
            <AddDocumentModal {...defaultProps} />
        );
        fireEvent.press(getByTestId('close-button'));
        expect(mockHandleCloseAnimation).toHaveBeenCalled();
    });

    it('should apply correct styles to modal content', () => {
        const { getByTestId } = render(
            <AddDocumentModal {...defaultProps} />
        );

        const modalContent = getByTestId('modal-content');
        expect(modalContent).toHaveStyle({
            backgroundColor: colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        });
    });
});
