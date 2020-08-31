import React from 'react';
import renderer from 'react-test-renderer';

import DeviceContainer from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer';
import { render, fireEvent } from '@testing-library/react';
import { wrapInTestContext } from 'react-dnd-test-utils';

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
    const tree = renderer.create(<TestComponent {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add device when plus icon is clicked', () => {
    const { getByTestId } = render(<TestComponent {...defaultProps} />);
    const plusIcon = getByTestId(/plus-icon/i);

    fireEvent.click(plusIcon);

    expect(addDeviceMock).toHaveBeenCalled();
    expect(addDeviceMock).toHaveBeenCalledWith('r');
  });
});