import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('src/common/api/topology');
import { getTopology } from 'src/common/api/topology';

import ConfigureTab, { getNextDeviceName, getNextNumber } from 'src/Emulator/Tabs/ConfigureTab';

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`

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
    getTopology.mockResolvedValue({
      networkconfig: xml,
    })
    const tree = renderer.create(<ConfigureTab status={'online'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});