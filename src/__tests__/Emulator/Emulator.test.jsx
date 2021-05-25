import React from 'react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { withEmulatorAndDialogueProvider } from 'src/Emulator/EmulatorProvider';

jest.mock('src/common/api/topology/requests');

import Emulator from 'src/Emulator/Emulator';


describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const { container } = renderWithTheme(<Emulator />)
    expect(container).toMatchSnapshot();
  })
});