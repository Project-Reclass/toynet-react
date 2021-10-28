/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { DeviceType } from 'src/common/types';
import { useDeleteDevice } from 'src/common/api/topology';
import { useDialogue, useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';

import DeleteNodeButton from '../DeleteNodeButton';

jest.mock('src/common/providers/EmulatorProvider');
jest.mock('src/common/api/topology');

const mockedUseDeleteDevice = useDeleteDevice as jest.MockedFunction<any>;
const mockedUseDialogue = useDialogue as jest.MockedFunction<any>;
const mockedUseEmulatorWithDialogue = useEmulatorWithDialogue as jest.MockedFunction<any>;

const defaultProps = {
  device: {
    name: 'H1',
    connections: [],
    type: 'host' as DeviceType,
    interfaces: [],
  },
};

const mockedMessageId = 1;

const mockDeleteDevice = jest.fn();
const appendDialogue = jest.fn();
const updateDialogueMessage = jest.fn();

describe('The delete node button', () => {
  beforeEach(() => {
    mockedUseDeleteDevice.mockReturnValue({ mutateAsync: mockDeleteDevice });
    mockedUseDialogue.mockReturnValue({ appendDialogue, updateDialogueMessage });
    mockedUseEmulatorWithDialogue.mockReturnValue({ sessionId: 1 });
    appendDialogue.mockReturnValue(mockedMessageId);
  });
  afterEach(() => {
    mockDeleteDevice.mockClear();
    appendDialogue.mockClear();
    updateDialogueMessage.mockClear();
  });
  it('should call the delete device', () => {
    const { getByTestId } = renderWithTheme(<DeleteNodeButton {...defaultProps} />);
    const btn = getByTestId('delete_node-btn');

    fireEvent.click(btn);

    expect(mockDeleteDevice).toHaveBeenCalled();
    expect(mockDeleteDevice).toBeCalledWith({ name: defaultProps.device.name });
  });
  it('should append dialogue on click', () => {
    const { getByTestId } = renderWithTheme(<DeleteNodeButton {...defaultProps} />);
    const { type: deviceType, name } = defaultProps.device;
    const btn = getByTestId('delete_node-btn');

    fireEvent.click(btn);

    expect(appendDialogue).toBeCalled();
    expect(appendDialogue).toHaveBeenCalledWith(`Attempting to delete ${deviceType} ${name}...`, 'grey');
  });
  it('should update the message on success', async () => {
    const { getByTestId } = renderWithTheme(<DeleteNodeButton {...defaultProps} />);
    const { type: deviceType, name } = defaultProps.device;
    const btn = getByTestId('delete_node-btn');

    fireEvent.click(btn);


    await waitFor(() => expect(updateDialogueMessage).toBeCalled());

    expect(updateDialogueMessage).toBeCalled();
    expect(updateDialogueMessage).toHaveBeenCalledWith(mockedMessageId, {
      message: `Deleted ${deviceType} ${name}`,
      color: 'White',
    });
  });
  it('should update the message on error with an error', async () => {
    mockDeleteDevice.mockRejectedValueOnce('');
    const { getByTestId } = renderWithTheme(<DeleteNodeButton {...defaultProps} />);
    const { type: deviceType, name } = defaultProps.device;
    const btn = getByTestId('delete_node-btn');

    fireEvent.click(btn);

    await waitFor(() => expect(updateDialogueMessage).toBeCalled());

    expect(updateDialogueMessage).toBeCalled();
    expect(updateDialogueMessage).toHaveBeenCalledWith(mockedMessageId, {
      message: `Unable to delete ${deviceType} ${name}`,
      color: 'tomato',
    });
  });
});