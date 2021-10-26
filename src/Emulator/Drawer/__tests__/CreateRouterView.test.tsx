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
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';
import { fireEvent } from '@testing-library/react';
import { useToast } from '@chakra-ui/core';

import { useCreateRouter } from 'src/common/api/topology';

import CreateRouterView from '../CreateRouterView';
import { DeviceInterface } from 'src/common/types';

jest.mock('src/common/api/topology');
jest.mock('src/common/providers/EmulatorProvider');
jest.mock('@chakra-ui/core', () => {
  const actual = jest.requireActual('@chakra-ui/core');
  return {
    ...actual,
    useToast: jest.fn(),
  };
});

const toastMock = jest.fn();
const createRouterMock = jest.fn();
const useToastMock = useToast as jest.MockedFunction<typeof useToast>;
const useCreateRouterMock = useCreateRouter as jest.MockedFunction<any>;
const useEmulatorWithDialogueMock = useEmulatorWithDialogue as jest.MockedFunction<any>;

const defaultRouter: DeviceInterface = {
  interfaces: [],
  name: 'R1',
  type: 'router',
  connections: [],
};

const setup = () => {
  const utils = renderWithTheme(<CreateRouterView nameHint='' />);
  const nameInput = utils.getByTestId('drawer-router-name-input');
  const ipInput = utils.getByTestId('drawer-router-ip-input');
  const interfaceInput = utils.getByTestId('ip_input-idx_0');
  const createBtn = utils.getByTestId('viewbtn-create');

  return {
    ...utils,
    nameInput,
    ipInput,
    interfaceInput,
    createBtn,
  };
};

describe('the create router view component', () => {
  beforeEach(() => {
    useToastMock.mockReturnValue(toastMock);
    createRouterMock.mockClear();
    useCreateRouterMock.mockReturnValue([
      createRouterMock,
      {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
      },
    ]);
    useEmulatorWithDialogueMock.mockReturnValue({
      sessionId: 1,
      appendDialogue: jest.fn(),
      switches: [],
    });
  });
  it('should show an error when the name is not provided', () => {
    const { getByText, nameInput, createBtn } = setup();
    fireEvent.change(nameInput, { target: { value: '' }});

    fireEvent.click(createBtn);
    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(createRouterMock).not.toHaveBeenCalled();
  });
  it('should show an error when the ip is not provided', () => {
    const { getByText, ipInput, createBtn } = setup();
    fireEvent.change(ipInput, { target: { value: '' }});

    fireEvent.click(createBtn);
    expect(getByText(/ip address is required/i)).toBeInTheDocument();
    expect(createRouterMock).not.toHaveBeenCalled();
  });
  it('should call the create router function if the router request is valid', () => {
    const { nameInput, ipInput, interfaceInput, createBtn } = setup();

    fireEvent.change(nameInput, { target: { value: 'H3' }});
    fireEvent.change(ipInput, { target: { value: '192.168.0.1' }});
    fireEvent.change(interfaceInput, { target: { value: '192.168.0.1' }});

    fireEvent.click(createBtn);

    expect(createRouterMock).toHaveBeenCalled();
  });
  it('should show an error when there are already 10 router', () => {
    const maxDevices = 10;
    useEmulatorWithDialogueMock.mockReturnValue({
      sessionId: 1,
      appendDialogue: jest.fn(),
      switches: new Array(maxDevices).fill({...defaultRouter}, 0, maxDevices),
    });
    const { nameInput, ipInput, interfaceInput, createBtn } = setup();

    fireEvent.change(nameInput, { target: { value: 'H3' }});
    fireEvent.change(ipInput, { target: { value: '192.168.0.1' }});
    fireEvent.change(interfaceInput, { target: { value: '192.168.0.1' }});

    fireEvent.click(createBtn);

    expect(toastMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith({
      status: 'error',
      position: 'top-right',
      isClosable: true,
      title: 'Unable to create router',
      description: 'You can only create 10 routers.',
    });
  });
});