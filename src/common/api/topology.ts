import axios from 'axios';

interface TopologyResponse {
  id: number;
  user: number;
  created: string;
  topology: string;
}

export const getBaseTopology = async (id: number) => {
  const { data } = await axios.post<TopologyResponse>(`/api/toynet/session/create/`, {toynet_id: 1, user_id: 0});
  return data;
};
