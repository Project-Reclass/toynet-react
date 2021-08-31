import axios from 'axios';

export interface Meta {
  value: string;
  inspiration: {
    organization: string;
    definition: string;
  }[];
}

export const getValueMeta = async (valueId: number): Promise<Meta> => {
  const { data } = await axios.get(`/data/value/${valueId}/meta.json`);
  return data;
};