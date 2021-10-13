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
import { useDeleteDeviceLink } from 'src/common/api/topology';
import { useDialogue, useEmulator } from 'src/common/providers/EmulatorProvider';

import DeleteConnectionBtn from '../DeleteConnectionBtn';

jest.mock('src/common/providers/EmulatorProvider');
jest.mock('src/common/api/topology');

const mockedUseDeleteDeviceLink = useDeleteDeviceLink as jest.MockedFunction<any>;
const mockedUseDialogue = useDialogue as jest.MockedFunction<any>;
const mockedUseEmulator = useEmulator as jest.MockedFunction<any>;

const defaultProps = {
  to: 'H1',
  from: 'H2',
};

const mockedMessageId = 1;

const mockDeleteDeviceLink = jest.fn();
const appendDialogue = jest.fn();
const updateDialogueMessage = jest.fn();
const dispatch = jest.fn();

describe('The delete connection button', () => {
  beforeEach(() => {
    mockedUseDeleteDeviceLink.mockReturnValue([mockDeleteDeviceLink]);
    mockedUseDialogue.mockReturnValue({ appendDialogue, updateDialogueMessage });
    mockedUseEmulator.mockReturnValue({ dispatch, sessionId: 1 });
    appendDialogue.mockReturnValue(mockedMessageId);
  });
  afterEach(() => {
    mockDeleteDeviceLink.mockClear();
    appendDialogue.mockClear();
    updateDialogueMessage.mockClear();
  });
  it('should call the delete device', () => {
    const { to, from } = defaultProps;
    const { getByTestId } = renderWithTheme(<DeleteConnectionBtn {...defaultProps} />);
    const btn = getByTestId('delete_conn-btn');

    fireEvent.click(btn);

    expect(mockDeleteDeviceLink).toHaveBeenCalled();
    expect(mockDeleteDeviceLink).toBeCalledWith({ dev_1: from, dev_2: to });
  });
  it('should append dialogue on click', () => {
    const { getByTestId } = renderWithTheme(<DeleteConnectionBtn {...defaultProps} />);
    const { to, from } = defaultProps;
    const btn = getByTestId('delete_conn-btn');

    fireEvent.click(btn);

    expect(appendDialogue).toBeCalled();
    expect(appendDialogue).toHaveBeenCalledWith(`Attempting to delete link between ${to} and ${from}...`, 'grey');
  });
  it('should update the message on success', async () => {
    const { getByTestId } = renderWithTheme(<DeleteConnectionBtn {...defaultProps} />);
    const { to, from } = defaultProps;
    const btn = getByTestId('delete_conn-btn');

    fireEvent.click(btn);


    await waitFor(() => expect(updateDialogueMessage).toBeCalled());

    expect(updateDialogueMessage).toBeCalled();
    expect(updateDialogueMessage).toHaveBeenCalledWith(mockedMessageId, {
      message: `Deleted link between ${to} and ${from}`,
      color: 'White',
    });
  });
  it('should update the message on error with an error', async () => {
    mockDeleteDeviceLink.mockRejectedValueOnce('');
    const { getByTestId } = renderWithTheme(<DeleteConnectionBtn {...defaultProps} />);
    const { to, from } = defaultProps;
    const btn = getByTestId('delete_conn-btn');

    fireEvent.click(btn);

    await waitFor(() => expect(updateDialogueMessage).toBeCalled());

    expect(updateDialogueMessage).toBeCalled();
    expect(updateDialogueMessage).toHaveBeenCalledWith(mockedMessageId, {
      message: `Unable to delete link between ${to} and ${from}`,
      color: 'tomato',
    });
  });
});