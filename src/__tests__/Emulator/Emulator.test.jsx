import React from 'react';
import renderer from 'react-test-renderer';

import Emulator from 'src/Emulator/Emulator';

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Local Area Networks',
  'objective': 'Connect two hosts together and check they can communicate',
  'tasks': [
    'Attach h1 to s1.',
    'Attach h2 to s1.',
    'Launch.',
    'In Console, run h1> arp 172.16.0.100.',
    'In Console, run h1> ping 172.16.0.100.',
    'In Console, run h1> arp 172.16.0.100.',
  ],
};

describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const tree = renderer.create(<Emulator panelData={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});