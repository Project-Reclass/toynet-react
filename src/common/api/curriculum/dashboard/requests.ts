import axios from 'axios';
import { DashboardIntf } from 'src/common/types/curriculum';

export const getCurriculum = async (curriculumId: number): Promise<DashboardIntf | undefined> => {
  const { data } = await axios.get(`/data/curriculum/${curriculumId}.json`);
  return data;
};