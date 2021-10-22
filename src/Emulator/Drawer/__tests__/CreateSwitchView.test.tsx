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
import { useToast } from '@chakra-ui/core';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { useCreateSwitch } from 'src/common/api/topology';
import { useEmulator, useDialogue } from 'src/common/providers/EmulatorProvider';
import CreateSwitchView from '../CreateSwitchView';


jest.mock('src/common/api/topology');
jest.mock('src/common/providers/EmulatorProvider');
jest.mock('@chakra-ui/core', () => {
  const actual = jest.requireActual('@chakra-ui/core');
  return {
    ...actual,
    useToast: jest.fn(),
  };
});

const useToastMock = useToast as jest.MockedFunction<typeof useToast>;
const useCreateSwitchMock = useCreateSwitch as jest.MockedFunction<any>;
const useEmulatorMock = useEmulator as jest.MockedFunction<any>;
const useDialogueMock = useDialogue as jest.MockedFunction<any>;

const toastMock = jest.fn();
const appendDialogueMock = jest.fn();
const createHostMock = jest.fn();
const defaultProps = {
  nameHint: 'S3',
};

const setup = (props?: typeof defaultProps) => {
  const utils = renderWithTheme(<CreateSwitchView {...defaultProps} {...props} />);
  const nameInput = utils.getByTestId('drawer-switch-name-input');
  const createBtn = utils.getByTestId('viewbtn-create');
  return {
    ...utils,
    createBtn,
    nameInput,
  };
};

const createSwitchMock = jest.fn();

describe('the create switch view component', () => {
  beforeEach(() => {
    toastMock.mockClear();
    createHostMock.mockClear();
    useToastMock.mockReturnValue(toastMock);
    useCreateSwitchMock.mockReturnValue([
      createSwitchMock,
      {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
      },
    ]);
    useDialogueMock.mockReturnValue({
      appendDialogue: jest.fn(),
    });
    useEmulatorMock.mockReturnValue({
      sessionId: 1,
      switches: [],
      appendDialogue: appendDialogueMock,
    });
  });
  it('should show an error when the name is invalid', () => {
    const { getByText, nameInput, createBtn } = setup();

    fireEvent.change(nameInput, { target: { value: '' }});
    fireEvent.click(createBtn);

    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(createHostMock).not.toHaveBeenCalled();
  });
  it('should not show an error until the form is submitted', () => {
    const { queryByText, nameInput, createBtn } = setup();

    fireEvent.change(nameInput, { target: { value: '' }});
    expect(queryByText(/name is required/i)).not.toBeInTheDocument();

    fireEvent.click(createBtn);

    expect(queryByText(/name is required/i)).toBeInTheDocument();
    expect(createHostMock).not.toHaveBeenCalled();
  });
  it('should call createSwitch when the name is valid', async () => {
    const { nameInput, createBtn } = setup();

    fireEvent.change(nameInput, { target: { value: 'S3' }});
    fireEvent.click(createBtn);

    await waitFor(() => expect(createSwitchMock).toHaveBeenCalled());
    expect(createSwitchMock).toHaveBeenCalledWith({ name: 'S3' });
  });
});