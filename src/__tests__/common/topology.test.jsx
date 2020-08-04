import { parseXMLTopology } from 'src/common/topologyParser';

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`

const xmlInvalidLink = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"h2\" /></link></linkList></topology>
`
describe('The topology parser', () => {
  it('should create switches, routers, and host nodes', () => {
    const res = parseXMLTopology(xml);
    expect(res.switches).toHaveLength(2);
    expect(res.routers).toHaveLength(1);
    expect(res.hosts).toHaveLength(2);
  });

  it('should be able to traverse the tree forward', () => {
    const res = parseXMLTopology(xml);
    const root = res.routers[0];
    const queue = [root];

    expect(root.children).toHaveLength(2);
    let count = 0;
    while (queue.length > 0) {
      const el = queue.shift();
      for (let child of el.children) {
        queue.push(child);
      }
      count++;
    }

    expect(count).toBe(5);
  });

  it('should be able to traverse the tree backwards', () => {
    const res = parseXMLTopology(xml);
    const root = res.routers[0];

    let node = res.switches[0];
    while (node.parent) {
      node = node.parent;
    }

    expect(node).toEqual(root);
  });

  it('should throw an error if there is an invalid link', () => {
    expect(() => parseXMLTopology(xmlInvalidLink)).toThrowError();
  });
});