import axios from 'axios';

interface TopologyResponse {
  id: number;
  user: number;
  created: string;
  networkconfig: string;
}

export const getBaseTopology = async (id: number) => {
  const { data } = await axios.get<TopologyResponse>(`/api/mininet/${1}/`);
  return data;
};