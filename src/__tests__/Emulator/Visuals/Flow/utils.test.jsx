import { createElements } from "src/Emulator/Visuals/Flow/utils";

const defaultDevices = [
  {
    name: 'h1',
    type: 'host',
    connections: ['s1']
  },
  {
    name: 'h2',
    type: 'switch',
    connections: ['s1']
  },
  {
    name: 's1',
    type: 'switch',
    connections: ['r1', 'h2', 'h1']
  },
  {
    name: 'r1',
    type: 'router',
    connections: ['s1']
  }
]

const expectedConns = [
  {
    source: 's1',
    target: 'r1',
  },
  {
    source: 'h1',
    target: 's1',
  },
  {
    source: 'h2',
    target: 's1',
  }
]

describe('createElements', () => {
  it('should create the same amount of flow elements plus links', () => {
    const flowElements = createElements(defaultDevices);
    expect(flowElements.length).toBeGreaterThanOrEqual(flowElements.length);
  });
  it('should create flow nodes for switch, router, and host', () => {
    const flowElements = createElements(defaultDevices);
    const flowIds = flowElements.map(el => el.id);
    const deviceIds = defaultDevices.map(el => el.name);

    for (let id of deviceIds) {
      expect(flowIds).toContain(id)
    }
  });
  it('should create links between flow elements', () => {
    const flowElements = createElements(defaultDevices);
    for (let conn of expectedConns) {
      const link = flowElements.find(el => el.source === conn.source);
      expect(link).toBeDefined();
      expect(link.target).toEqual(conn.target);
    }
  });
  it('should not create duplicate links', () => {
    // if this test and the above test pass then we know that there are
    // no duplicate links created
    const flowElements = createElements(defaultDevices);
    expect(flowElements.length).toEqual(defaultDevices.length + expectedConns.length);
  });
});