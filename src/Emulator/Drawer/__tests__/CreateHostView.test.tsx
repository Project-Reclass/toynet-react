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
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { useCreateHost } from 'src/common/api/topology';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';

import CreateHostView from '../CreateHostView';
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

const useToastMock = useToast as jest.MockedFunction<typeof useToast>;
const useCreateHostMock = useCreateHost as jest.MockedFunction<any>;
const useEmulatorWithDialogueMock = useEmulatorWithDialogue as jest.MockedFunction<any>;

const defaultProps = {
  nameHint: 'H3',
};

const setup = (props?: Partial<typeof defaultProps>) => {
  const utils = renderWithTheme(<CreateHostView {...defaultProps} {...props} />);
  const nameInput = utils.getByTestId('drawer-host-name-input');
  const gatewayInput = utils.getByTestId('drawer-host-default_gateway-input');
  const ipInput = utils.getByTestId('drawer-host-ip-input');
  const createBtn = utils.getByTestId('viewbtn-create');
  return {
    nameInput, gatewayInput,
    ipInput, createBtn,
    ...utils,
  };
};

const toastMock = jest.fn();
const appendDialogueMock = jest.fn();
const createHostMock = jest.fn();
const defaultHost: DeviceInterface = {
  type: 'host',
  name: 'h2',
  connections: [],
  interfaces: [],
};

describe('the create host view', () => {
  beforeEach(() => {
    toastMock.mockClear();
    createHostMock.mockClear();
    useToastMock.mockReturnValue(toastMock);
    useCreateHostMock.mockReturnValue([
      createHostMock,
      {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
      },
    ]);
    useEmulatorWithDialogueMock.mockReturnValue({
      sessionId: 1,
      hosts: [defaultHost],
      appendDialogue: appendDialogueMock,
    });
  });
  it('should show a toast error when there are already 10 devices', () => {
    const numDevices = 10;
    useEmulatorWithDialogueMock.mockReturnValue({
      sessionId: 1,
      hosts: new Array<DeviceInterface>(numDevices).fill({...defaultHost}, 0, numDevices),
      appendDialogue: appendDialogueMock,
    });
    const { ipInput, gatewayInput, createBtn } = setup();

    fireEvent.change(ipInput, { target: { value: '192.168.1.1' }});
    fireEvent.change(gatewayInput, { target: { value: '192.168.1.1' }});
    fireEvent.click(createBtn);

    expect(toastMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith({
      status: 'error',
      position: 'top-right',
      isClosable: true,
      title: 'Unable to create host',
      description: 'You can only create 10',
    });
  });
  it('should call create host on a valid call', () => {
    const { ipInput, gatewayInput, createBtn } = setup({ nameHint: 'H3' });

    fireEvent.change(ipInput, { target: { value: '192.168.1.2' }});
    fireEvent.change(gatewayInput, { target: { value: '192.168.1.1' }});
    fireEvent.click(createBtn);

    expect(createHostMock).toHaveBeenCalled();
    expect(createHostMock).toHaveBeenCalledWith({
      name: 'H3',
      ip: '192.168.1.2',
      def_gateway: '192.168.1.1',
    });
  });
});