import React from 'react';
import renderer from 'react-test-renderer';

import DeviceContainer from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer';
import { render, fireEvent } from '@testing-library/react';

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
    const tree = renderer.create(<DeviceContainer {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add device when plus icon is clicked', () => {
    const { getByAltText } = render(<DeviceContainer {...defaultProps} />);
    const plusIcon = getByAltText(/plus icon/i);

    fireEvent.click(plusIcon);

    expect(addDeviceMock).toHaveBeenCalled();
    expect(addDeviceMock).toHaveBeenCalledWith('r');
  });
});