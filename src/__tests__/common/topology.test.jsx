import { parseXMLTopology } from 'src/common/topologyParser';

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`

const xmlInvalidLink = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"doesNotExists\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`
describe('The topology parser', () => {
  it('should create switches, routers, and host nodes', () => {
    const res = parseXMLTopology(xml);
    expect(res.switches).toHaveLength(2);
    expect(res.routers).toHaveLength(1);
    expect(res.hosts).toHaveLength(2);
  });

  it('should show connections', () => {
    const res = parseXMLTopology(xml);

    expect(res.switches).toHaveLength(2);
    expect(res.switches[0].connections).toHaveLength(1);
    expect(res.switches[0].connections).toContain('h1');
    expect(res.switches[1].connections).toHaveLength(1);
    expect(res.switches[1].connections).toContain('h2');

    expect(res.routers[0].connections).toHaveLength(2);
    expect(res.routers[0].connections).toContain('s1');
    expect(res.routers[0].connections).toContain('s2');
  });

  it('should throw an error if there is an invalid link', () => {
    expect(() => parseXMLTopology(xmlInvalidLink)).toThrowError();
  });
});