import React from 'react';
import renderer from 'react-test-renderer';
import { renderTreeWithTheme, renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { withEmulatorAndDialogueProvider } from 'src/Emulator/EmulatorProvider';

import Emulator from 'src/Emulator/Emulator';

describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const tree = renderTreeWithTheme(<Emulator />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should show an error sign if there are too many devices added', async () => {

    const EmulatedEmulator = withEmulatorAndDialogueProvider(Emulator);
    const { getAllByTestId, getByText, getAllByText } = renderWithTheme(
      <DndProvider backend={HTML5Backend}>
        <EmulatedEmulator status={'show'} />
      </DndProvider>
    );

    const plusIcon = getAllByTestId('plus-icon');

    for (let i = 0; i < 12; i++) {
      act(() => {
        fireEvent.click(plusIcon[0]);
      });
    }

    await waitFor(() => getAllByText(/Max number of devices/i));
    expect(getByText(/Max number of devices/i)).toBeInTheDocument();
  });
});