import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SortByPicker } from '@components/common';
import { SortOption } from '@/types/IDocument';

jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: ({ testID, name, color }: any) => (
        <mock-icon
            testID={testID || `icon-${name}`}
            data-icon-name={name}
            data-color={color}
        />
    ),
    Entypo: ({ testID, name, color }: any) => (
        <mock-icon
            testID={testID || `icon-${name}`}
            data-icon-name={name}
            data-color={color}
        />
    ),
    Ionicons: ({ testID }: { testID?: string }) => (
        <mock-icon testID={testID} />
    )
}));

describe('SortByPicker', () => {
    const mockOnSelect = jest.fn();
    const mockOnToggleOrder = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render component correctly', () => {
        const { getByTestId } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        expect(getByTestId('sort-picker-container')).toBeTruthy();
        expect(getByTestId('sort-button')).toBeTruthy();
        expect(getByTestId('order-button')).toBeTruthy();
    });

    it('should show initial selected value (Name)', () => {
        const { getByText } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        expect(getByText(SortOption.Name)).toBeTruthy();
    });

    it('should display correct icon based on ascending/descending order', () => {
        const { getByTestId, rerender } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        let orderIcon = getByTestId('order-icon');
        expect(orderIcon.props['data-icon-name']).toBe('chevron-up');

        rerender(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={false}
            />
        );

        orderIcon = getByTestId('order-icon');
        expect(orderIcon.props['data-icon-name']).toBe('chevron-down');
    });

    it('should call onToggleOrder when order button is pressed', () => {
        const { getByTestId } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        fireEvent.press(getByTestId('order-button'));
        expect(mockOnToggleOrder).toHaveBeenCalledTimes(1);
    });

    it('should open modal when sort button is pressed', () => {
        const { getByTestId } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        fireEvent.press(getByTestId('sort-button'));
        expect(getByTestId('sort-modal')).toBeTruthy();
    });

    it('should close modal when close button is pressed', () => {
        const { getByTestId, queryByTestId } = render(
            <SortByPicker
                onSelect={mockOnSelect}
                onToggleOrder={mockOnToggleOrder}
                orderAscending={true}
            />
        );

        fireEvent.press(getByTestId('sort-button'));
        fireEvent.press(getByTestId('close-modal-button'));

        expect(queryByTestId('sort-modal')).toBeNull();
    });
});
