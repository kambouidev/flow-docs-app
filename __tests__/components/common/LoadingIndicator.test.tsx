import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingIndicator } from '@components/common';

describe('LoadingIndicator', () => {
    it('should display message correctly', () => {
        const message = 'Loading...';
        const { getByText, getByTestId } = render(
            <LoadingIndicator message={message} />
        );

        const messageElement = getByTestId('loading-message');
        expect(messageElement).toBeTruthy();
        expect(getByText(message)).toBeTruthy();
    });

    it('should render spinner', () => {
        const { getByTestId } = render(
            <LoadingIndicator message="Test" />
        );

        expect(getByTestId('loading-spinner')).toBeTruthy();
    });
});
