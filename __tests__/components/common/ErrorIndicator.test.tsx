import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorIndicator } from '@components/common';
import { colors } from '@constants/theme';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ testID }: { testID: string }) => <mock-icon testID={testID} />
}));

describe('ErrorIndicator', () => {
    it('should display error message correctly', () => {
        const message = 'Test error';
        const { getByText, getByTestId } = render(<ErrorIndicator message={message} />);

        const messageElement = getByTestId('error-indicator-message');
        expect(messageElement).toBeTruthy();
        expect(getByText(message)).toBeTruthy();
    });

    it('should render all component elements', () => {
        const { getByTestId } = render(<ErrorIndicator message="Test" />);

        expect(getByTestId('error-indicator-container')).toBeTruthy();
        expect(getByTestId('error-indicator-icon')).toBeTruthy();
        expect(getByTestId('error-indicator-message')).toBeTruthy();
    });

    it('should apply correct styles to container', () => {
        const { getByTestId } = render(<ErrorIndicator message="Test" />);

        const container = getByTestId('error-indicator-container');
        expect(container).toHaveStyle({
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        });
    });

    it('should apply correct styles to message', () => {
        const { getByTestId } = render(<ErrorIndicator message="Test" />);

        const messageElement = getByTestId('error-indicator-message');
        expect(messageElement).toHaveStyle({
            marginTop: 10,
            fontSize: 16,
            color: colors.darkGray
        });
    });
});
