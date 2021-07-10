import axios from 'axios';

export interface Meta {
  value: string;
  inspiration: {
    organization: string;
    definition: string;
  }[];
}

export const getValueMeta = async (valueId: number): Promise<Meta> => {
  const { data } = await axios.get(`/api/value/${valueId}/inspirations`);
  return data;
};