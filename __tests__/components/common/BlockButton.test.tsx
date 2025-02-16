import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BlockButton } from '@components/common';
import { colors } from '@constants/theme';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ testID }: { testID: string }) => <mock-icon testID={testID} />
}));

describe('BlockButton', () => {
    const mockHandlePress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render with provided text', () => {
        const text = 'Test Button';
        const { getByText } = render(
            <BlockButton text={text} handlePress={mockHandlePress} />
        );

        expect(getByText(text)).toBeTruthy();
    });

    it('should call handlePress when button is pressed', () => {
        const { getByText } = render(
            <BlockButton text="Test" handlePress={mockHandlePress} />
        );

        fireEvent.press(getByText('Test'));
        expect(mockHandlePress).toHaveBeenCalledTimes(1);
    });

    it('should not call handlePress when button is disabled', () => {
        const { getByText } = render(
            <BlockButton
                text="Test"
                handlePress={mockHandlePress}
                disabled={true}
            />
        );

        fireEvent.press(getByText('Test'));
        expect(mockHandlePress).not.toHaveBeenCalled();
    });

    it('should display icon when iconType is provided', () => {
        const { getByTestId } = render(
            <BlockButton
                text="Test"
                handlePress={mockHandlePress}
                iconType="add"
            />
        );

        expect(getByTestId('icon-add')).toBeTruthy();
    });

    it('should apply correct styles to normal button', () => {
        const { getByTestId } = render(
            <BlockButton text="Test" handlePress={mockHandlePress} />
        );

        const button = getByTestId('block-button');
        expect(button).toHaveStyle({
            backgroundColor: colors.primaryBlue,
            padding: 16,
            borderRadius: 10,
        });
    });

    it('should apply disabled styles when disabled is true', () => {
        const { getByTestId } = render(
            <BlockButton
                text="Test"
                handlePress={mockHandlePress}
                disabled={true}
            />
        );

        const button = getByTestId('block-button');
        expect(button).toHaveStyle({
            opacity: 0.5
        });
    });
});
