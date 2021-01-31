import React from 'react';

import DeviceContainer from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer';
import { fireEvent } from '@testing-library/react';
import { wrapInTestContext } from 'react-dnd-test-utils';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

const TestComponent = wrapInTestContext(DeviceContainer);

const addDeviceMock = jest.fn();

const defaultProps = {
  deviceName: 'Router',
  devices: [
    {
      name: 'R1',
      connections: ['h1', 'h2', 's1']
    },
    {
      name: 'R2',
      connections: ['h3', 's1']
    }
  ],

  addDevice: addDeviceMock,
};

describe('The DeviceContainer', () => {
  afterEach(() => {
    addDeviceMock.mockClear();
  });

  it('should match previous snapshots', () => {
    const { container } = renderWithTheme(<TestComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should add device when plus icon is clicked', () => {
    const { getByTestId } = renderWithTheme(<TestComponent {...defaultProps} />);
    const plusIcon = getByTestId(/plus-icon/i);

    fireEvent.click(plusIcon);

    expect(addDeviceMock).toHaveBeenCalled();
    expect(addDeviceMock).toHaveBeenCalledWith('r');
  });
});