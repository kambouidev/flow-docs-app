import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ViewModeSelector } from '@components/common';
import { ViewMode } from '@/types/IDocument';
import { colors } from '@constants/theme';

jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: ({ testID, name, color }: any) => (
        <mock-icon
            testID={testID}
            data-icon-name={name}
            data-color={color}
        />
    )
}));

describe('ViewModeSelector', () => {
    const mockOnChangeViewMode = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly in list mode', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.List}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        expect(getByTestId('view-mode-container')).toBeTruthy();
        expect(getByTestId('list-mode-button')).toBeTruthy();
        expect(getByTestId('grid-mode-button')).toBeTruthy();
    });

    it('should show list icon with correct color when active', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.List}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        const listIcon = getByTestId('icon-view-list');
        expect(listIcon.props['data-color']).toBe(colors.linkBlue);
    });

    it('should show grid icon with correct color when active', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.Grid}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        const gridIcon = getByTestId('icon-grid-view');
        expect(gridIcon.props['data-color']).toBe(colors.linkBlue);
    });

    it('should call onChangeViewMode with Grid when grid button is pressed', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.List}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        fireEvent.press(getByTestId('grid-mode-button'));
        expect(mockOnChangeViewMode).toHaveBeenCalledWith(ViewMode.Grid);
    });

    it('should call onChangeViewMode with List when list button is pressed', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.Grid}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        fireEvent.press(getByTestId('list-mode-button'));
        expect(mockOnChangeViewMode).toHaveBeenCalledWith(ViewMode.List);
    });

    it('should apply active styles to selected button', () => {
        const { getByTestId } = render(
            <ViewModeSelector
                viewMode={ViewMode.List}
                onChangeViewMode={mockOnChangeViewMode}
            />
        );

        const listButton = getByTestId('list-mode-button');
        expect(listButton).toHaveStyle({
            backgroundColor: colors.white
        });
    });
});
