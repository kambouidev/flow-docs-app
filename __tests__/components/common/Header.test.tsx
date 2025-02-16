import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from '@components/common';
import { colors } from '@constants/theme';

// Mock del componente Ionicons
jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ testID, name }: { testID?: string; name: string }) => (
        <mock-icon testID={testID || `icon-${name}`} />
    )
}));

describe('Header', () => {
    const mockOnClose = jest.fn();
    const mockBackButton = jest.fn();
    const mockGoToNotifications = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render title correctly', () => {
        const title = 'Test Header';
        const { getByText } = render(<Header title={title} />);

        expect(getByText(title)).toBeTruthy();
    });

    it('should show close button when onClose is provided', () => {
        const { getByTestId } = render(
            <Header title="Test" onClose={mockOnClose} />
        );

        const closeButton = getByTestId('icon-close');
        expect(closeButton).toBeTruthy();
    });

    it('should call onClose when close button is pressed', () => {
        const { getByTestId } = render(
            <Header title="Test" onClose={mockOnClose} />
        );

        fireEvent.press(getByTestId('icon-close'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should show back button when backButton is provided', () => {
        const { getByTestId } = render(
            <Header title="Test" backButton={mockBackButton} />
        );

        const backButton = getByTestId('icon-chevron-back');
        expect(backButton).toBeTruthy();
    });

    it('should call backButton when back button is pressed', () => {
        const { getByTestId } = render(
            <Header title="Test" backButton={mockBackButton} />
        );

        fireEvent.press(getByTestId('back-button'));
        expect(mockBackButton).toHaveBeenCalledTimes(1);
    });

    it('should show notifications button when goToNotifications is provided', () => {
        const { getByTestId } = render(
            <Header title="Test" goToNotifications={mockGoToNotifications} />
        );

        const notificationsButton = getByTestId('icon-notifications-outline');
        expect(notificationsButton).toBeTruthy();
    });

    it('should display notifications count when notifications exist', () => {
        const notifications = 7;
        const { getByText } = render(
            <Header
                title="Test"
                goToNotifications={mockGoToNotifications}
                notifications={notifications}
            />
        );

        expect(getByText(String(notifications))).toBeTruthy();
    });

    it('should limit notifications count to 99', () => {
        const { getByText } = render(
            <Header
                title="Test"
                goToNotifications={mockGoToNotifications}
                notifications={100}
            />
        );

        expect(getByText('99')).toBeTruthy();
    });

    it('should not show notifications indicator when no notifications', () => {
        const { queryByTestId } = render(
            <Header
                title="Test"
                goToNotifications={mockGoToNotifications}
                notifications={undefined}
            />
        );

        expect(queryByTestId('notifications-dot')).toBeNull();
    });

    it('should apply correct styles to main container', () => {
        const { getByTestId } = render(<Header title="Test" />);
        const header = getByTestId('header-container');

        expect(header).toHaveStyle({
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.white
        });
    });
});
