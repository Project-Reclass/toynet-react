import { simulateNetwork } from 'src/common/utils';
import modules from 'src/__data__/curriculum/modules.json';

export const getAllModules = () => {
  return simulateNetwork(() => modules);
};

export const getModuleById = (id: number) => {
  return simulateNetwork(() => modules.find(module => module.id === id));
};

export const getModuleByName = (name: string) => {
  return simulateNetwork(() => modules.find(module => module.name === name));
};