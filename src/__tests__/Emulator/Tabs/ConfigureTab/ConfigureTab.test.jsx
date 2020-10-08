import React from 'react';
import renderer from 'react-test-renderer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

jest.mock('src/common/api/topology/requests')
import ConfigureTab, { getNextDeviceName, getNextNumber } from 'src/Emulator/Tabs/ConfigureTab';
import { withEmulatorProvider } from 'src/Emulator/EmulatorProvider';
import { render, act, fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';


describe('ConfigureTab helper functions', () => {
  it('should increment numbers correctly', () => {
    const randomInt = Math.floor(Math.random() * 10) + 1;

    expect(getNextNumber(`r${randomInt}`)).toEqual(randomInt + 1);
    expect(getNextNumber(`s${randomInt}`)).toEqual(randomInt + 1);
    expect(getNextNumber(`h${randomInt}`)).toEqual(randomInt + 1);
  });

  it('should increment device names correctly', () => {
    const testRouter = [{ name: "r1", connections: [] }];
    const testSwitch = [{ name: "s1", connections: [] }];
    const testHost = [{ name: "h1", connections: [] }];

    expect(getNextDeviceName(testRouter, "r")).toEqual("r2");
    expect(getNextDeviceName(testSwitch, "s")).toEqual("s2");
    expect(getNextDeviceName(testHost, "h")).toEqual("h2");
  });

  it('should handle empty initial configs correctly', () => {
    const emptyConfig = [];

    expect(getNextDeviceName(emptyConfig, "r")).toEqual("r1");
    expect(getNextDeviceName(emptyConfig, "s")).toEqual("s1");
    expect(getNextDeviceName(emptyConfig, "h")).toEqual("h1");
  });
});

describe('ConfigureTab', ()=> {
  it('should match previous snapshots', () => {
    const tree = renderer.create(<ConfigureTab status={'online'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show an error sign if there are too many devices added', () => {
    const EmulatedConfigureTab = withEmulatorProvider(ConfigureTab);
    const { getAllByTestId, getByText } = renderWithTheme(
      <DndProvider backend={HTML5Backend}>
        <EmulatedConfigureTab status={'show'} />
      </DndProvider>
    );

    const plusIcon = getAllByTestId('plus-icon');

    for (let i = 0; i < 12; i++) {
      act(() => {
        fireEvent.click(plusIcon[0]);
      });
    }

    expect(getByText(/Max number of devices/i)).toBeInTheDocument();
  });
});