import { DashboardIntf } from 'src/common/types/curriculum';
import data from './mock.json';

const mockData = [data];

export const getCurriculum = (curriculumId: number): Promise<DashboardIntf | undefined> => {
  const curriculumData = mockData.find(data => data.id === curriculumId);
  // eslint-disable-next-line no-magic-numbers
  return new Promise((resolve) => setTimeout(() => resolve(curriculumData as DashboardIntf), 1000));
};