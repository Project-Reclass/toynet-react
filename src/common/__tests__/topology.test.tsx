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
import { parseXMLTopology } from 'src/common/topologyParser';

const xml = `
<?xml version="1.0" encoding="UTF-8"?><topology><root>r0</root><routerList><router name="r0" ip="172.16.0.1/24"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name="s1" /><switch name="s2" /></switchList><hostList><host name="h1" ip="172.16.0.2/24"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name="h2" ip="172.16.1.2/24"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name="r0"><intf>1</intf></dvc><dvc name="s1"><intf>0</intf></dvc></link><link><dvc name="r0"><intf>2</intf></dvc><dvc name="s2"><intf>0</intf></dvc></link><link><dvc name="s1"><intf>1</intf></dvc><dvc name="h1" /></link><link><dvc name="s2"><intf>1</intf></dvc><dvc name="h2" /></link></linkList></topology>
`;

const xmlInvalidLink = `
<?xml version="1.0" encoding="UTF-8"?><topology><root>r0</root><routerList><router name="r0" ip="172.16.0.1/24"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name="s1" /><switch name="s2" /></switchList><hostList><host name="h1" ip="172.16.0.2/24"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name="h2" ip="172.16.1.2/24"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name="r0"><intf>1</intf></dvc><dvc name="s1"><intf>0</intf></dvc></link><link><dvc name="r0"><intf>2</intf></dvc><dvc name="s2"><intf>0</intf></dvc></link><link><dvc name="s1"><intf>1</intf></dvc><dvc name="h1" /></link><link><dvc name="doesNotExists"><intf>1</intf></dvc><dvc name="h2" /></link></linkList></topology>
`;

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
    expect(res.switches[0].connections).toHaveLength(2);
    expect(res.switches[0].connections).toContain('h1');
    expect(res.switches[0].connections).toContain('r0');
    expect(res.switches[1].connections).toHaveLength(2);
    expect(res.switches[1].connections).toContain('h2');
    expect(res.switches[1].connections).toContain('r0');

    expect(res.routers[0].connections).toHaveLength(2);
    expect(res.routers[0].connections).toContain('s1');
    expect(res.routers[0].connections).toContain('s2');
  });
  it('should throw an error if there is an invalid link', () => {
    expect(() => parseXMLTopology(xmlInvalidLink)).toThrowError();
  });
  it('should create interfaces for routers', () => {
    const numInterfaces = 3;
    const res = parseXMLTopology(xml);
    expect(res.routers).toHaveLength(1);
    expect(res.routers[0].interfaces).toHaveLength(numInterfaces);
    expect(res.routers[0].interfaces[0]).toBe('10.0.0.1/30');
    expect(res.routers[0].interfaces[1]).toBe('172.16.0.1/24');
    expect(res.routers[0].interfaces[2]).toBe('172.16.1.1/24');
  });
  it('should create default gateways for routers', () => {
    const res = parseXMLTopology(xml);
    expect(res.hosts).toHaveLength(2);
    expect(res.hosts[0].defaultGateway?.device).toBe('r0');
    expect(res.hosts[0].defaultGateway?.interface).toBe(1);
    expect(res.hosts[1].defaultGateway?.device).toBe('r0');
    expect(res.hosts[1].defaultGateway?.interface).toBe(2);
  });
  it('should create an ip for a host', () => {
    const res = parseXMLTopology(xml);
    expect(res.hosts).toHaveLength(2);
    expect(res.hosts[0].ip).toBe('172.16.0.2/24');
    expect(res.hosts[1].ip).toBe('172.16.1.2/24');
  });
});