import { useQuery } from 'react-query';
import { getAllModules, getModuleById, getModuleByName } from './requests';

export function useAllModules() {
  return useQuery('modules', getAllModules);
}

export function useModuleById(id: number) {
  return useQuery(['module', { id }], (_, { id }) => getModuleById(id));
}

export function useModuleByName(name: string) {
  return useQuery(['module', { name }], (_, { name }) => getModuleByName(name));
}